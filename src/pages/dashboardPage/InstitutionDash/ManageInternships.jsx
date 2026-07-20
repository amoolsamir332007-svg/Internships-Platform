import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiBriefcase,
  FiEdit3,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import "./InstitutionDash.css";

const ManageInternships = () => {
  const navigate = useNavigate();

  const handleCreateInternship = () => {
    navigate("/dashboard/institution/post-internship");
  };

  return (
    <div className="manage-internships">
      <div className="manage-internships-header">
        <div>
          <h1 className="manage-internships-title">
            Manage Internships
          </h1>

          <p className="manage-internships-subtitle">
            Manage your internship opportunities, track applicants and update listings.
          </p>
        </div>

        <button
          className="manage-internships-add-btn"
          onClick={handleCreateInternship}
        >
          <FiPlus />
          New Internship
        </button>
      </div>

      <div className="manage-internships-empty">
        <div className="manage-empty-icon">
          <FiBriefcase />
        </div>

        <h2>No internships available yet</h2>

        <p>
          You haven't created any internship opportunities. Start by posting
          your first internship and attract talented students.
        </p>

        <button
          className="manage-empty-create-btn"
          onClick={handleCreateInternship}
        >
          <FiPlus />
          Create Internship
        </button>
      </div>

      <div className="manage-feature-cards">
        <div className="manage-feature-card">
          <FiUsers />

          <div>
            <h3>Track Applicants</h3>

            <p>Review and manage student applications.</p>
          </div>
        </div>

        <div className="manage-feature-card">
          <FiEdit3 />

          <div>
            <h3>Edit Opportunities</h3>

            <p>Update internship details easily.</p>
          </div>
        </div>

        <div className="manage-feature-card">
          <FiClock />

          <div>
            <h3>Internship Status</h3>

            <p>Control publishing and closing dates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInternships;