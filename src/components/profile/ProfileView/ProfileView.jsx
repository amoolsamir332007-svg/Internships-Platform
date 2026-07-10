
    import React from 'react';
    import './Profile.css';

    const ProfileView = ({ profileData, role }) => {
    if (!profileData) {
        return <div className="no-data">No data to display</div>;
    }

    return (
        <div className="profile-view-card">
        <div className="profile-view-header">
            <div className="profile-avatar">
            {role === 'student' ? '👤' : '🏢'}
            </div>
            <div className="profile-title-info">
            <h2>{profileData.name}</h2>
            <span className="role-tag">
                {role === 'student' ? 'Student / Graduate': 'Partner Institution'}
            </span>
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