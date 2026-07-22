    import React from 'react';
    import './ProfileView.css';

    const ProfileView = ({ profileData, role }) => {
    if (!profileData) {
        return <div className="no-data">No data to display</div>;
    }

    return (
        <div className="profile-view-card">
        <div className="profile-view-header">
            <div className="profile-avatar">
            {role === "student" && (
  <div className="profile-meta-grid">

    <div className="meta-item">
      <strong>🏫 University</strong>
      <span>{profileData.university || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>🎓 Major</strong>
      <span>{profileData.major || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>📚 Level</strong>
      <span>{profileData.level || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>📊 GPA</strong>
      <span>{profileData.gpa || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>📞 Phone</strong>
      <span>{profileData.phoneNumber || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>📧 Email</strong>
      <span>{profileData.email || "Undefined"}</span>
    </div>

    <div className="meta-item">
      <strong>📍 Location</strong>
      <span>{profileData.location || "Undefined"}</span>
    </div>
<div className="profile-skills-section">
    <h3>Skills</h3>

    <div className="skills-container">
      {profileData.skills?.length ? (
        profileData.skills.map((skill, index) => (
          <span key={index} className="skill-chip">
            {skill}
          </span>
        ))
      ) : (
        <p>No skills added.</p>
      )}
    </div>
  </div>
  <div className="profile-links">

    {profileData.githubUrl && (
      <a
        href={profileData.githubUrl}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    )}

    {profileData.linkedinUrl && (
      <a
        href={profileData.linkedinUrl}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    )}

    {profileData.portfolioUrl && (
      <a
        href={profileData.portfolioUrl}
        target="_blank"
        rel="noreferrer"
      >
        Portfolio
      </a>
    )}

    {profileData.cvPath && (
      <a
        href={profileData.cvPath}
        target="_blank"
        rel="noreferrer"
      >
        View CV
      </a>
    )}

  </div>
  </div>
)}
            </div>
        </div>

        <div className="profile-view-body">
            {role === 'student' && (
            <div className="profile-meta-grid">
                <div className="meta-item">
                <strong>🏫The university:</strong>
                <span>{profileData.university || 'Undefined'}</span>
                </div>
                <div className="meta-item">
                <strong>🎓Major:</strong>
                <span>{profileData.major || 'Undefined'}</span>
                </div>
            </div>
            )}

            <div className="profile-bio-section">
            <h3>📄 Profile</h3>
            <p>{profileData.bio || 'No bio has been written yet.'}</p>
            </div>
        </div>
        </div>
    );
    };

    export default ProfileView;