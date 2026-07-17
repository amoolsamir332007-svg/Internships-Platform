import { useNavigate } from "react-router-dom";
import "./InstitutionDash.css";

// NOTE: this page used to call getMyInternships/publish/closeInternship/
// deleteInternship — none of which exist on the backend (the swagger docs
// only show POST /Institution/opportunities to create one, and no GET to
// list your own opportunities, no PUT/PATCH/DELETE on an opportunity).
// Rather than call endpoints that 404, this is shown as a "not available
// yet" placeholder until those routes exist on the backend.
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
