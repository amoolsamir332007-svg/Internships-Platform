import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import { getMyInternships } from "../../../api/internshipService";
import { getApplicantsForInstitution } from "../../../api/applicationService";
import StatCard from "../../../components/dashboard/StatCard/StatCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import "./InstitutionDash.css";

const InstitutionDashboard = () => {
  const { user } = useAuth();

  const { data: internships, loading: internshipsLoading } = useFetch(
    () => getMyInternships(),
    [],
  );

  const { data: pendingApplicants, loading: applicantsLoading } = useFetch(
    () => getApplicantsForInstitution({ status: "pending" }),
    [],
  );

  const internshipsList = internships || [];
  const pendingList = pendingApplicants || [];

  const publishedCount = internshipsList.filter(
    (i) => i.status === "published",
  ).length;
  const draftCount = internshipsList.filter((i) => i.status === "draft").length;

  const loading = internshipsLoading || applicantsLoading;

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
            label="Total internships"
            value={internshipsList.length}
            accent="blue"
          />
          <StatCard label="Published" value={publishedCount} accent="green" />
          <StatCard label="Drafts" value={draftCount} accent="orange" />
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
          <p>Edit, publish, or close your existing internship posts.</p>
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
