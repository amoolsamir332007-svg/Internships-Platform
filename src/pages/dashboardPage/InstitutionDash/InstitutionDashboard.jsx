import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import { getApplicantsForInstitution } from "../../../api/applicationService";
import StatCard from "../../../components/dashboard/StatCard/StatCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import "./InstitutionDash.css";

// NOTE: the "Total internships / Published / Drafts" stats used to come
// from getMyInternships(), which has no matching backend endpoint (the
// API only exposes POST /Institution/opportunities, not a GET to list
// them). Those stats are removed until that endpoint exists; only
// "Pending applicants" is backed by a real route
// (GET /Institution/applications).
const InstitutionDashboard = () => {
  const { user } = useAuth();

  const { data: pendingApplicants, loading: applicantsLoading } = useFetch(
    () => getApplicantsForInstitution({ status: "pending" }),
    [],
  );

  const pendingList = pendingApplicants || [];

  const loading = applicantsLoading;

  return (
    <div className="institution-dashboard">
      <div className="institution-dashboard-header">
        <h1>
          Welcome back{user?.institutionName ? `, ${user.institutionName}` : ""}
        </h1>
        <p>Here's what's happening with your internships today.</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="institution-dashboard-stats">
          <StatCard
            label="Pending applicants"
            value={pendingList.length}
            accent="red"
          />
        </div>
      )}

      <div className="institution-dashboard-actions">
        <Link
          to="/dashboard/institution/post-internship"
          className="institution-dashboard-action-card"
        >
          <h3>Post an internship</h3>
          <p>Create a new internship listing for students to apply to.</p>
        </Link>
        <Link
          to="/dashboard/institution/manage-internships"
          className="institution-dashboard-action-card"
        >
          <h3>Manage internships</h3>
          <p>Coming soon — the API doesn't support listing/editing them yet.</p>
        </Link>
        <Link
          to="/dashboard/institution/applicants"
          className="institution-dashboard-action-card"
        >
          <h3>Review applicants</h3>
          <p>See who has applied and manage application statuses.</p>
        </Link>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
