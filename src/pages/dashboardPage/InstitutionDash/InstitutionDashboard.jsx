import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiFileText,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import { useAuth } from "../../../hooks/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import { getApplicantsForInstitution } from "../../../api/applicationService";
import { normalizeApplicationStatus } from "../../../utils/helpers";

import StatCard from "../../../components/dashboard/StatCard/StatCard";
import ApplicantCard from "../../../components/dashboard/ApplicantCard/ApplicantCard";
import InstitutionCharts from "../../../components/dashboard/InstitutionCharts/InstitutionCharts";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";

import "./InstitutionDash.css";

const InstitutionDashboard = () => {
  const { user } = useAuth();

  const {
    data: applicants,
    loading,
  } = useFetch(() => getApplicantsForInstitution(), []);

  const allApplicants = applicants || [];

  const pendingApplicants = allApplicants.filter(
    (item) => normalizeApplicationStatus(item.status) === "pending"
  );

  const acceptedApplicants = allApplicants.filter(
    (item) => normalizeApplicationStatus(item.status) === "accepted"
  );

  return (
    <div className="institution-dashboard">
      <div className="institution-dashboard-header">
        <h1>
          Welcome back
          {user?.institutionName ? `, ${user.institutionName}` : ""}
        </h1>

        <p>
          Manage your internships, review applicants, and find the best
          candidates.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="institution-dashboard-stats">
          <StatCard
            icon={<FiBriefcase />}
            label="Internships"
            value="12"
            accent="purple"
          />

          <StatCard
            icon={<FiFileText />}
            label="Applications"
            value={allApplicants.length}
            accent="blue"
          />

          <StatCard
            icon={<FiClock />}
            label="Pending"
            value={pendingApplicants.length}
            accent="red"
          />

          <StatCard
            icon={<FiCheckCircle />}
            label="Accepted"
            value={acceptedApplicants.length}
            accent="green"
          />
        </div>
      )}

      <InstitutionCharts />

      <section className="institution-dashboard-recent">
        <div className="institution-section-title">
          <h2>Recent Applicants</h2>

          <Link to="/dashboard/institution/applicants">
            View All
          </Link>
        </div>

        <div className="institution-recent-list">
          {allApplicants.length === 0 ? (
            <p className="institution-empty">
              No applications available yet.
            </p>
          ) : (
            allApplicants
              .slice(0, 3)
              .map((applicant) => (
                <ApplicantCard
                  key={applicant.applicationID}
                  applicant={applicant}
                />
              ))
          )}
        </div>
      </section>

      <div className="institution-dashboard-actions">
        <Link
          to="/dashboard/institution/post-internship"
          className="institution-dashboard-action-card"
        >
          <h3>Post Internship</h3>

          <p>
            Create a new internship opportunity and attract talented students.
          </p>
        </Link>

        <Link
          to="/dashboard/institution/manage-internships"
          className="institution-dashboard-action-card"
        >
          <h3>Manage Internships</h3>

          <p>
            View and control your published internship opportunities.
          </p>
        </Link>

        <Link
          to="/dashboard/institution/applicants"
          className="institution-dashboard-action-card"
        >
          <h3>Review Applicants</h3>

          <p>
            Check applications and manage student statuses.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default InstitutionDashboard;