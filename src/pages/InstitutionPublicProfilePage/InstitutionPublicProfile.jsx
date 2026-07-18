import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as internshipService from "../../api/internshipService";
import InternshipCard from "../../components/common/InternshipCards/InternshipCard";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import "./InstitutionPublicProfile.css";

const InstitutionPublicProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const passedInstitution = location.state?.institution || null;

  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(true);

  useEffect(() => {
     const loadOpportunities = async () => {
      setLoadingOpportunities(true);
      try {
        const res = await internshipService.getPublished();
        const all = res.data || [];
        const filtered = id
          ? all.filter((o) => String(o.institutionID) === String(id))
          : all;
        setOpportunities(filtered);
      } catch {
        setOpportunities([]);
      } finally {
        setLoadingOpportunities(false);
      }
    };
    loadOpportunities();
  }, [id]);

  if (!passedInstitution) {
    return (
      <div className="institution-public-profile-page">
        <div className="institution-public-profile-missing">
          <h2>Institution profile isn't available directly</h2>
          <p>
            The backend doesn't currently expose a public "get institution by
            id" endpoint, so this page can only show an institution's
            information when you arrive here from one of their internship
            listings (which already includes their info).
          </p>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="institution-public-profile-page">
      <div className="institution-public-profile-header">
        <div className="institution-public-profile-avatar">🏢</div>
        <div>
          <h1>{passedInstitution.name}</h1>
          <p>{passedInstitution.address}</p>
        </div>
      </div>

      <div className="institution-public-profile-grid">
        <div className="institution-public-profile-card">
          <h3>Contact Information</h3>
          <div className="institution-public-profile-item">📧 {passedInstitution.email}</div>
          <div className="institution-public-profile-item">📞 {passedInstitution.phoneNumber}</div>
          <div className="institution-public-profile-item">📍 {passedInstitution.address}</div>
        </div>
      </div>

      <div className="institution-public-profile-opportunities">
        <h2>Open Internships</h2>
        {loadingOpportunities ? (
          <LoadingSpinner />
        ) : opportunities.length === 0 ? (
          <p className="institution-public-profile-empty">
            No open internships from this institution at the moment.
          </p>
        ) : (
          <div className="institution-public-profile-cards">
            {opportunities.map((o) => (
              <InternshipCard
                key={o.opportunityID}
                internship={o}
                onClick={() => navigate(`/internships/${o.opportunityID}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionPublicProfile;
