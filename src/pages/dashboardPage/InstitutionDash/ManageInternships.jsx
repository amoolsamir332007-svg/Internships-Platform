import { useNavigate } from "react-router-dom";
import "./InstitutionDash.css";

const ManageInternships = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-internships">
      <div className="manage-internships-header">
        <h1 className="manage-internships-title">Manage Internships</h1>
        <button
          className="manage-internships-add-btn"
          onClick={() => navigate("/dashboard/institution/post-internship")}
        >
          + New Internship
        </button>
      </div>

      <p className="manage-internships-empty">
        Listing, editing, publishing, closing, and deleting internships isn't
        supported by the API yet — only creating a new internship is
        currently available. This page will be wired up once those backend
        endpoints exist.
      </p>
    </div>
  );
};

export default ManageInternships;
