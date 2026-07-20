import { useState, useCallback, useEffect, useRef } from "react";
import {
  getStudentProfile,
  updateStudentProfile,
  uploadStudentImage,
  uploadStudentCv,
} from "../../api/profileService";
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

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const imageInputRef = useRef(null);
  const cvInputRef = useRef(null);

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

  const handleAvatarClick = () => {
    if (!uploadingImage) {
      imageInputRef.current?.click();
    }
  };

  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedImageTypes.includes(file.type)) {
      setUploadError("Only PNG, JPEG, or WEBP images are allowed");
      return;
    }

    setUploadError("");
    setUploadingImage(true);
    try {
      await uploadStudentImage(file);
      const refreshed = await getStudentProfile();
      setProfile(refreshed.data);
      setSuccessMessage("Profile picture updated.");
    } catch (err) {
      setUploadError(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "Something went wrong while uploading your picture."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCvButtonClick = () => {
    if (!uploadingCv) {
      cvInputRef.current?.click();
    }
  };

  const handleCvSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setUploadError("Only PDF files are allowed");
      return;
    }

    setUploadError("");
    setUploadingCv(true);
    try {
      await uploadStudentCv(file);
      const refreshed = await getStudentProfile();
      setProfile(refreshed.data);
      setSuccessMessage("CV uploaded successfully.");
    } catch (err) {
      setUploadError(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "Something went wrong while uploading your CV."
      );
    } finally {
      setUploadingCv(false);
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
        {uploadError && <div className="student-profile-page-error">{uploadError}</div>}
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
                <button
                  type="button"
                  className="student-profile-view-avatar"
                  onClick={handleAvatarClick}
                  disabled={uploadingImage}
                  title="Click to change your profile picture"
                >
                  {profile.profileImagePath ? (
                    <img
                      src={profile.profileImagePath}
                      alt={`${profile.name}'s profile`}
                      className="student-profile-view-avatar-img"
                    />
                  ) : (
                    profile.name?.charAt(0)?.toUpperCase() || "?"
                  )}
                  {uploadingImage && (
                    <span className="student-profile-avatar-uploading">...</span>
                  )}
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="student-profile-hidden-input"
                  onChange={handleImageSelected}
                />

                <div>
                  <h2>{profile.name}</h2>
                  <p>{profile.level}</p>
                </div>

                <div className="student-profile-cv-section">
                  {profile.cvPath && (
                   <a
                      href={profile.cvPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="student-profile-cv-view-link">
                      View CV
                    </a>
                  )}
                  <button
                    type="button"
                    className="student-profile-cv-btn"
                    onClick={handleCvButtonClick}
                    disabled={uploadingCv}
                  >
                    {uploadingCv
                      ? "Uploading CV..."
                      : profile.cvPath
                        ? "Replace CV"
                        : "Upload CV"}
                  </button>
                </div>
                <input
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf"
                  className="student-profile-hidden-input"
                  onChange={handleCvSelected}
                />

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