import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaFileAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { useFetch } from "../../../hooks/useFetch";
import { getMyApplications } from "../../../api/applicationService";
import { getPublished } from "../../../api/internshipService";
import StatCard from "../../../components/dashboard/StatCard/StatCard";
import InternshipCard from "../../../components/common/InternshipCards/InternshipCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import { ROUTES } from "../../../utils/constants";
import DashboardCharts from "../../../components/dashboard/DashboardCharts/DashboardCharts";
import "./StudentDash.css";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: applications, loading: applicationsLoading } = useFetch(
    () => getMyApplications(),
    []
  );

  const { data: internships, loading: internshipsLoading } = useFetch(
    () => getPublished(),
    []
  );

  const applicationsList = applications || [];
  const internshipsList = internships || [];

  const acceptedCount = applicationsList.filter((a) => a.status === "accepted").length;
  const pendingCount = applicationsList.filter((a) => a.status === "pending").length;

  const loading = applicationsLoading || internshipsLoading;

  const stats = [
    { title: "Applied Internships", number: applicationsList.length, icon: <FaFileAlt />, accent: "purple" },
    { title: "Accepted", number: acceptedCount, icon: <FaCheckCircle />, accent: "green" },
    { title: "Pending", number: pendingCount, icon: <FaClock />, accent: "orange" },
    { title: "Available Jobs", number: internshipsList.length, icon: <FaBriefcase />, accent: "blue" },
  ];

  return (
    <div className="student-dashboard">
      <div className="student-dashboard-hero">
        <div className="student-dashboard-hero-decor student-dashboard-hero-decor-1" />
        <div className="student-dashboard-hero-decor student-dashboard-hero-decor-2" />

        <div className="student-dashboard-hero-text">
          <h1>
            Welcome{user?.fullName ? ` ${user.fullName}` : ""}
            <br />
            Start Your Career Journey
          </h1>
          <p>
            Discover internships, apply to opportunities, and build your
            professional future.
          </p>
          <button
            className="student-dashboard-hero-btn"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Explore Internships →
          </button>
        </div>
        <div className="student-dashboard-hero-badge">
          <div className="student-dashboard-hero-badge-icon">
            <FaBriefcase />
          </div>
          <p>Find Your Dream Internship</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="stats-grid">
            {stats.map((item, index) => (
              <StatCard
                key={index}
                icon={item.icon}
                value={item.number}
                label={item.title}
                accent={item.accent}
              />
            ))}
          </div>

          <DashboardCharts applications={applicationsList} internships={internshipsList} />

          <div className="dashboard-section">
            <div className="section-title">
              <h2>Recommended Internships</h2>
            </div>

            {internshipsList.length === 0 ? (
              <p className="dashboard-empty">
                No published internships available right now, check back later.
              </p>
            ) : (
              <div className="internship-grid">
                {internshipsList.map((internship) => (
                  <InternshipCard
                    key={internship.opportunityID}
                    internship={internship}
                    onClick={(item) => navigate(ROUTES.INTERNSHIP_DETAIL(item.opportunityID))}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
