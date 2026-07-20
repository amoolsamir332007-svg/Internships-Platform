import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import {
  getApplicantsForInstitution,
  acceptApplication,
  rejectApplication,
} from "../../../api/applicationService";
import StatusTabs from "../../../components/dashboard/StatusTabs/StatusTabs";
import ApplicantCard from "../../../components/dashboard/ApplicantCard/ApplicantCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import { normalizeApplicationStatus } from "../../../utils/helpers";
import "./InstitutionDash.css";

const TABS = [
  { label: "all", value: "all" },
  { label: "pending", value: "pending" },
  { label: "accepted", value: "accepted" },
  { label: "rejected", value: "rejected" },
];

const InstitutionApplicants = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [applicantsData, setApplicantsData] = useState([]);

  const {
    data: allApplicants,
    loading,
    error,
  } = useFetch(() => getApplicantsForInstitution(), []);

  useEffect(() => {
    if (allApplicants) {
      const visibleApplicants = allApplicants.filter(
        (applicant) => normalizeApplicationStatus(applicant.status) !== "withdrawn"
      );
      setApplicantsData(visibleApplicants);
    }
  }, [allApplicants]);

  const applicants =
    activeTab === "all"
      ? applicantsData
      : applicantsData.filter(
          (applicant) =>
            normalizeApplicationStatus(applicant.status) === activeTab
        );

  const handleAccept = async (applicationId) => {
    setActionLoadingId(applicationId);

    try {
      await acceptApplication(applicationId);

      setApplicantsData((previousApplicants) =>
        previousApplicants.map((applicant) =>
          applicant.applicationID === applicationId
            ? { ...applicant, status: "accepted" }
            : applicant
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong while accepting the application"
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (applicationId) => {
    setActionLoadingId(applicationId);

    try {
      await rejectApplication(applicationId);

      setApplicantsData((previousApplicants) =>
        previousApplicants.map((applicant) =>
          applicant.applicationID === applicationId
            ? { ...applicant, status: "rejected" }
            : applicant
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong while rejecting the application"
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="institution-applicants">
      <h1 className="institution-applicants-title">Applicants</h1>

      <StatusTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <p className="institution-applicants-error">
          {error}
        </p>
      )}

      {!loading && !error && applicants.length === 0 && (
        <p className="institution-applicants-empty">
          No applicants found for the selected status.
        </p>
      )}

      <div className="institution-applicants-list">
        {!loading &&
          applicants.map((applicant) => (
            <ApplicantCard
              key={applicant.applicationID}
              applicant={applicant}
              onAccept={handleAccept}
              onReject={handleReject}
              isLoading={actionLoadingId === applicant.applicationID}
            />
          ))}
      </div>
    </div>
  );
};

export default InstitutionApplicants;