import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import {
  getMyApplications,
  withdrawApplication,
} from "../../../api/applicationService";
import StatusTabs from "../../../components/dashboard/StatusTabs/StatusTabs";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import { getStatusColor, formatDate } from "../../../utils/helpers";
import { ROUTES } from "../../../utils/constants";
import "./StudentDash.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const StudentApplications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [withdrawingId, setWithdrawingId] = useState(null);
  const navigate = useNavigate();

  const statusFilter = activeTab === "all" ? undefined : activeTab;

  const {
    data: applications,
    loading,
    error,
    refetch,
  } = useFetch(() => getMyApplications(statusFilter), [activeTab]);

  const applicationsList = applications || [];

  const handleWithdraw = async (applicationId) => {
    setWithdrawingId(applicationId);
    try {
      await withdrawApplication(applicationId);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while withdrawing the application");
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="applications-page">
      <h1>My Applications</h1>
      <p className="page-desc">Track your internship applications status.</p>

      <StatusTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {loading && <LoadingSpinner />}

      {error && <p className="dashboard-empty">{error}</p>}

      {!loading && !error && applicationsList.length === 0 && (
        <p className="dashboard-empty">
          No applications found for the selected status.
        </p>
      )}

      {!loading && applicationsList.length > 0 && (
        <div className="applications-table">
          <div className="table-header">
            <span>Internship</span>
            <span>Company</span>
            <span>Applied on</span>
            <span>Status</span>
            <span></span>
          </div>

          {applicationsList.map((item) => (
            <div className="table-row" key={item._id || item.id}>
              <span>{item.internship?.title || item.title || "-"}</span>
              <span>
                {item.internship?.institution?.name ||
                  item.institution?.name ||
                  item.company ||
                  "-"}
              </span>
              <span>{formatDate(item.createdAt || item.appliedAt)}</span>
              <span className={`status ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <span>
                {item.status === "pending" && (
                  <button
                    className="withdraw-btn"
                    disabled={withdrawingId === (item._id || item.id)}
                    onClick={() => handleWithdraw(item._id || item.id)}
                  >
                    {withdrawingId === (item._id || item.id)
                      ? "Withdrawing..."
                      : "Withdraw"}
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        className="browse-internships-btn"
        onClick={() => navigate(ROUTES.HOME)}
      >
        Browse more internships
      </button>
    </div>
  );
};

export default StudentApplications;
