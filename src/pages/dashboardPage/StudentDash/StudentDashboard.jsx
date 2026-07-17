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
import "./StudentDash.css";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: applications, loading: applicationsLoading } = useFetch(
    () => getMyApplications(),
    []
  );

  const { data: internships, loading: internshipsLoading } = useFetch(
    () => getPublished(6),
    []
  );

  const applicationsList = applications || [];
  const internshipsList = internships || [];

  const acceptedCount = applicationsList.filter(
    (a) => a.status === "accepted"
  ).length;
  const pendingCount = applicationsList.filter(
    (a) => a.status === "pending"
  ).length;

  const loading = applicationsLoading || internshipsLoading;

  const stats = [
    {
      title: "Applied Internships",
      number: applicationsList.length,
      icon: <FaFileAlt />,
    },
    {
      title: "Accepted",
      number: acceptedCount,
      icon: <FaCheckCircle />,
    },
    {
      title: "Pending",
      number: pendingCount,
      icon: <FaClock />,
    },
    {
      title: "Available Jobs",
      number: internshipsList.length,
      icon: <FaBriefcase />,
    },
  ];

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back{user?.fullName ? `, ${user.fullName}` : ""} 🚀</h1>
        <p>Discover internships and build your future career.</p>
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
              />
            ))}
          </div>

          <div className="dashboard-section">
            <div className="section-title">
              <h2>Recommended Internships</h2>
            </div>

            {internshipsList.length === 0 ? (
              <p className="dashboard-empty">
                No published internships available right now, check back
                later.
              </p>
            ) : (
              <div className="internship-grid">
                {internshipsList.map((internship) => (
                  <InternshipCard
                    key={internship._id || internship.id}
                    internship={internship}
                    onClick={(item) =>
                      navigate(
                        ROUTES.INTERNSHIP_DETAIL(item._id || item.id)
                      )
                    }
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
