import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import {
  getMyApplications,
  withdrawApplication,
} from "../../../api/applicationService";
import StatusTabs from "../../../components/dashboard/StatusTabs/StatusTabs";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import {
  getApplicationStatusLabel,
  normalizeApplicationStatus,
  formatDate,
} from "../../../utils/helpers";
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
  const [hiddenApplicationIds, setHiddenApplicationIds] = useState([]);

  const navigate = useNavigate();

  const {
    data: allApplications,
    loading,
    error,
    refetch,
  } = useFetch(() => getMyApplications(), []);

  const applicationsList = (allApplications || []).filter((item) => {
    const itemId = item.applicationID;

    if (hiddenApplicationIds.includes(itemId)) {
      return false;
    }

    const normalizedStatus = normalizeApplicationStatus(item.status);

    if (
      activeTab === "all" &&
      normalizedStatus === "withdrawn"
    ) {
      return false;
    }

    if (activeTab !== "all") {
      return normalizedStatus === activeTab;
    }

    return true;
  });

  const handleWithdraw = async (applicationId) => {
    setWithdrawingId(applicationId);

    try {
      await withdrawApplication(applicationId);

      setHiddenApplicationIds((prev) => [
        ...prev,
        applicationId,
      ]);

      await refetch();
    } catch (err) {
      console.error(err);

      alert(
        "Something went wrong while withdrawing the application"
      );
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="applications-page">
      <h1>My Applications</h1>

      <p className="page-desc">
        Track your internship applications status.
      </p>

      <StatusTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <p className="dashboard-empty">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        applicationsList.length === 0 && (
          <p className="dashboard-empty">
            No applications found for the selected status.
          </p>
        )}

      {!loading &&
        applicationsList.length > 0 && (
          <div className="applications-cards-grid">
            {applicationsList.map((item) => {
              const normalizedStatus =
                normalizeApplicationStatus(item.status);

              const itemId = item.applicationID;

              const title =
                item.opportunity?.title || "-";

              const company =
                item.opportunity?.institution?.name ||
                "Unknown Institution";

              return (
                <div
                  className="application-card"
                  key={itemId}
                >
                  <div className="application-card-header">
                    <h3>{title}</h3>

                    <span
                      className={`status ${normalizedStatus}`}
                    >
                      {getApplicationStatusLabel(item.status)}
                    </span>
                  </div>

                  <div className="application-card-company">
                    <span className="application-card-company-icon">
                      🏢
                    </span>

                    <p>{company}</p>
                  </div>

                  <div className="application-card-footer">
                    <span className="application-card-date">
                      📅 {formatDate(item.appliedAt)}
                    </span>

                    {normalizedStatus === "pending" && (
                      <button
                        className="withdraw-btn"
                        disabled={
                          withdrawingId === itemId
                        }
                        onClick={() =>
                          handleWithdraw(itemId)
                        }
                      >
                        {withdrawingId === itemId
                          ? "Withdrawing..."
                          : "Withdraw"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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