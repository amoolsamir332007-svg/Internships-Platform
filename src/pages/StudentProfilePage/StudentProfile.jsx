import { useState, useCallback, useEffect } from "react";
import { getStudentProfile, updateStudentProfile } from "../../api/profileService";
import StudentProfileForm from "../../components/profile/StudentProfileForm/StudentProfileForm";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import "./StudentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasProfile, setHasProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getStudentProfile();
      setProfile(res.data);
      setHasProfile(true);
    } catch (err) {
      if (err.response?.status === 404) {
        setHasProfile(false);
        setProfile(null);
        setIsEditing(true); 
      } else {
        setError(
          err.response?.data?.title ||
          err.response?.data?.message ||
          "Something went wrong while loading your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async (formData) => {
    setError("");
    setSuccessMessage("");
    try {
      const res = await updateStudentProfile(formData);
      setProfile(res.data || formData);
      setHasProfile(true);
      setIsEditing(false);
      setSuccessMessage("Profile saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "Something went wrong while saving your profile."
      );
    }
  };

  if (loading) {
    return (
      <div className="student-profile-page">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="student-profile-page">
      <div className="profile-container">
        <div className="student-profile-page-header">
          <h1>My Profile</h1>
          <p>Keep your information up to date so institutions know who they're reviewing.</p>
        </div>

        {error && <div className="student-profile-page-error">{error}</div>}
        {successMessage && <div className="student-profile-page-success">{successMessage}</div>}

        {!hasProfile && !error && (
          <div className="student-profile-page-empty">
            You haven't created your profile yet. Fill in the form below to get started.
          </div>
        )}

        {isEditing ? (
          <StudentProfileForm initialData={profile} onSave={handleSave} />
        ) : (
          profile && (
            <div className="student-profile-view">
              <div className="student-profile-view-header">
                <div className="student-profile-view-avatar">
                  {profile.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <h2>{profile.name}</h2>
                  <p>{profile.level}</p>
                </div>
                <button className="student-profile-edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>

              <div className="student-profile-view-grid">
                <div className="student-profile-view-card">
                  <h3>About Me</h3>
                  <p>{profile.bio}</p>
                </div>

                <div className="student-profile-view-card">
                  <h3>Contact & Academic Info</h3>
                  <div className="student-profile-view-item">📞 {profile.phoneNumber}</div>
                  <div className="student-profile-view-item">🎓 Level: {profile.level}</div>
                  <div className="student-profile-view-item">📊 GPA: {profile.gpa}</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
