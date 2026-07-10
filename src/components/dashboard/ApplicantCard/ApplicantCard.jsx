import "./ApplicantCard.css";
 
const STATUS_LABELS = {
  pending: { text: "waiting", className: "applicant-card-status-pending" },
  accepted: { text: "accepted", className: "applicant-card-status-accepted" },
  rejected: { text: "rejected", className: "applicant-card-status-rejected" },
};
 
const ApplicantCard = ({ applicant, onAccept, onReject, isLoading }) => {
  const statusInfo = STATUS_LABELS[applicant.status] || STATUS_LABELS.pending;
 
  return (
    <div className="applicant-card">
      <div className="applicant-card-info">
        <h3 className="applicant-card-name">{applicant.studentName}</h3>
        <p className="applicant-card-university">
          {applicant.studentUniversity} - {applicant.studentMajor}
        </p>
        <p className="applicant-card-internship">
         applied for <strong>{applicant.internshipTitle}</strong>
        </p>
        <p className="applicant-card-date">Date of Application: {applicant.appliedAt}</p>
 
        {applicant.cvUrl && (
          <a
            href={applicant.cvUrl}
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
 
        {applicant.status === "pending" && (
          <div className="applicant-card-buttons">
            <button
              className="applicant-card-btn-accept"
              disabled={isLoading}
              onClick={() => onAccept(applicant.id)}
            >
             Accept
            </button>
            <button
              className="applicant-card-btn-reject"
              disabled={isLoading}
              onClick={() => onReject(applicant.id)}
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