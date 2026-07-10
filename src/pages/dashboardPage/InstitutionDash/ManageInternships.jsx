
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import {
  getMyInternships,
  publish,
  closeInternship,
  deleteInternship,
} from "../../../api/internshipService";
import StatusTabs from "../../../components/dashboard/StatusTabs/StatusTabs";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import "./InstitutionDash.css";
 
const TABS = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Closed", value: "closed" },
];
 
const ManageInternships = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("published");
  const [actionLoadingId, setActionLoadingId] = useState(null);
 
  const {
    data: internships,
    loading,
    error,
    refetch,
  } = useFetch(() => getMyInternships(activeTab), [activeTab]);
 
  const handlePublish = async (id) => {
    setActionLoadingId(id);
    try {
      await publish(id);
      refetch();
    } catch (err) {
      alert("Something went wrong while publishing the internship");
    } finally {
      setActionLoadingId(null);
    }
  };
 
  const handleClose = async (id) => {
    setActionLoadingId(id);
    try {
      await closeInternship(id);
      refetch();
    } catch (err) {
      alert("Something went wrong while closing the internship");
    } finally {
      setActionLoadingId(null);
    }
  };
 
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship? This action cannot be undone."
    );
    if (!confirmed) return;
 
    setActionLoadingId(id);
    try {
      await deleteInternship(id);
      refetch();
    } catch (err) {
      alert("Something went wrong while deleting the internship");
    } finally {
      setActionLoadingId(null);
    }
  };
 
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
 
      <StatusTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
 
      {loading && <LoadingSpinner />}
 
      {error && <p className="manage-internships-error">{error}</p>}
 
      {!loading && !error && internships?.length === 0 && (
        <p className="manage-internships-empty">No internships found</p>
      )}
 
      <div className="manage-internships-list">
        {!loading &&
          internships?.map((internship) => (
            <div key={internship.id} className="manage-internships-card">
              <div className="manage-internships-card-info">
                <h3>{internship.title}</h3>
                <p className="manage-internships-applicants-count">
                  Number of Applicants: {internship.applicantsCount ?? 0}
                </p>
              </div>
 
              <div className="manage-internships-card-actions">
                <button
                  className="manage-internships-btn-edit"
                  onClick={() =>
                    navigate(
                      `/dashboard/institution/post-internship?edit=${internship.id}`
                    )
                  }
                >
                  Edit
                </button>
 
                {activeTab === "draft" && (
                  <button
                    className="manage-internships-btn-publish"
                    disabled={actionLoadingId === internship.id}
                    onClick={() => handlePublish(internship.id)}
                  >
                    Publish
                  </button>
                )}
 
                {activeTab === "published" && (
                  <button
                    className="manage-internships-btn-close"
                    disabled={actionLoadingId === internship.id}
                    onClick={() => handleClose(internship.id)}
                  >
                    Close
                  </button>
                )}
 
                <button
                  className="manage-internships-btn-delete"
                  disabled={actionLoadingId === internship.id}
                  onClick={() => handleDelete(internship.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
 
export default ManageInternships;