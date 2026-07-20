import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as internshipService from "../../api/internshipService";
import * as applicationService from "../../api/applicationService";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import {
  formatDate,
  getStatusLabel,
  extractErrorMessage,
} from "../../utils/helpers";
import { ROUTES, STORAGE_KEYS, USER_ROLES } from "../../utils/constants";
import "./InternshipDetail.css";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [applyState, setApplyState] = useState("idle");
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    const loadInternship = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const response = await internshipService.getPublished();
        const all = response.data || [];
        console.log("Route ID:", id);
console.log("All opportunities:", all);
console.log(
  "IDs:",
  all.map(o => o.opportunityID)
);
        const found = all.find((o) => String(o.opportunityID) === String(id));
        console.log("Found:", found);
        if (!found) {
          setLoadError("This internship could not be found.");
        } else {
          setInternship(found);
        }
      } catch (err) {
        setLoadError("Something went wrong while loading this internship.");
      } finally {
        setLoading(false);
      }
    };
    loadInternship();
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) {
      navigate(ROUTES.LOGIN);
      return;
    }

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (user?.role && user.role !== USER_ROLES.STUDENT) {
      setApplyState("error");
      setApplyError("Only students can apply to internships.");
      return;
    }

    setApplyState("loading");
    setApplyError("");
    try {
      await applicationService.applyToInternship(internship.opportunityID);
      setApplyState("applied");
    } catch (err) {
      setApplyState("error");
      setApplyError(
        extractErrorMessage(
          err,
          "Something went wrong while applying. Please try again.",
        ),
      );
    }
  };

  const handleViewInstitution = () => {
    if (!internship) return;
    navigate(ROUTES.INSTITUTION_PROFILE_VIEW(internship.institutionID), {
      state: { institution: internship.institution },
    });
  };

  if (loading) {
    return (
      <div className="internship-detail-page">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadError || !internship) {
    return (
      <div className="internship-detail-page">
        <div className="internship-detail-missing">
          <h2>{loadError || "This internship could not be found."}</h2>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="internship-detail-page">
      <div className="internship-container">
        <section className="internship-header">
          <div>
            <h1>{internship.title}</h1>

            <h3
              className="internship-detail-institution-link"
              onClick={handleViewInstitution}
              role="button"
              tabIndex={0}
            >
              🏢 {internship.institution?.name || "Unknown Institution"}
            </h3>

            <div className="badges">
              <span>{getStatusLabel(internship.status)}</span>

              {internship.location && <span>📍 {internship.location}</span>}

              {internship.startDate && (
                <span>📅 Starts {formatDate(internship.startDate)}</span>
              )}

              {internship.endDate && (
                <span>🏁 Ends {formatDate(internship.endDate)}</span>
              )}

              {internship.capacity != null && (
                <span>👥 {internship.capacity} spots</span>
              )}
            </div>
          </div>

          <div className="internship-detail-apply">
            <button
              className="apply-btn"
              onClick={handleApply}
              disabled={applyState === "loading" || applyState === "applied"}
            >
              {applyState === "applied"
                ? "Applied ✓"
                : applyState === "loading"
                  ? "Applying..."
                  : "Apply Now"}
            </button>

            {applyState === "error" && (
              <p className="internship-detail-apply-error">{applyError}</p>
            )}
          </div>
        </section>

        <div className="detail-grid">
          <div className="detail-card">
            <h2>Internship Description</h2>
            <p>{internship.description}</p>
          </div>

          {Array.isArray(internship.skills) && internship.skills.length > 0 && (
            <div className="detail-card">
              <h2>Required Skills</h2>
              <div className="skills">
                {internship.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
