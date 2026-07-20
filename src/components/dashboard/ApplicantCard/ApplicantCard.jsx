import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { normalizeApplicationStatus, formatDate } from "../../../utils/helpers";
import "./ApplicantCard.css";

const STATUS_LABELS = {
  pending: { text: "waiting", className: "applicant-card-status-pending" },
  accepted: { text: "accepted", className: "applicant-card-status-accepted" },
  rejected: { text: "rejected", className: "applicant-card-status-rejected" },
};

const ApplicantCard = ({ applicant, onAccept, onReject, isLoading }) => {
  const navigate = useNavigate();
  const normalizedStatus = normalizeApplicationStatus(applicant.status);
  const statusInfo = STATUS_LABELS[normalizedStatus] || STATUS_LABELS.pending;

  const student = applicant.student || {};
  const internshipTitle = applicant.opportunity?.title || "-";

  const handleShowApplicant = () => {
    navigate(ROUTES.STUDENT_PROFILE_VIEW(student.studentID), {
      state: {
        student: {
          name: student.name,
          level: student.level,
          bio: student.bio,
          phoneNumber: student.phoneNumber,
          gpa: student.gpa,
          profileImagePath: student.profileImagePath,
          cvPath: student.cvPath,
        },
      },
    });
  };

  return (
    <div className="applicant-card">
      <div className="applicant-card-avatar">
        {student.profileImagePath ? (
          <img
            src={student.profileImagePath}
            alt={`${student.name}'s profile`}
            className="applicant-card-avatar-img"
          />
        ) : (
          <span className="applicant-card-avatar-fallback">
            {student.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}
      </div>

      <div className="applicant-card-info">
        <h3 className="applicant-card-name">{student.name || "-"}</h3>
        <p className="applicant-card-university">{student.level}</p>
        <p className="applicant-card-internship">
          applied for <strong>{internshipTitle}</strong>
        </p>
        <p className="applicant-card-date">
          Date of Application: {formatDate(applicant.appliedAt)}
        </p>

        {student.cvPath && (
          <a
            href={student.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="applicant-card-cv-link"
          >
            View CV
          </a>
        )}
      </div>

      <div className="applicant-card-actions">
        <span className={`applicant-card-status ${statusInfo.className}`}>
          {statusInfo.text}
        </span>

        <button
          className="applicant-card-btn-show"
          onClick={handleShowApplicant}
        >
          Show applicant
        </button>

        {normalizedStatus === "pending" && (
          <div className="applicant-card-buttons">
            <button
              className="applicant-card-btn-accept"
              disabled={isLoading}
              onClick={() => onAccept(applicant.applicationID)}
            >
              Accept
            </button>
            <button
              className="applicant-card-btn-reject"
              disabled={isLoading}
              onClick={() => onReject(applicant.applicationID)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;