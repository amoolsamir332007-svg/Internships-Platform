    // ProfileView.jsx بيستخدم بصفحات العرض العام للبروفايل — عرض للبروفايل بدون تعديل (read-only) Props: profileData, role لتحديد شكل العرض حسب النوع
    //

    import React from 'react';
    import './Profile.css';

    const ProfileView = ({ profileData, role }) => {
    if (!profileData) {
        return <div className="no-data">لا توجد بيانات لعرضها</div>;
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
                {role === 'student' ? 'طالب / خريج' : 'مؤسسة شريكة'}
            </span>
            </div>
        </div>

        <div className="profile-view-body">
            {role === 'student' && (
            <div className="profile-meta-grid">
                <div className="meta-item">
                <strong>🏫 الجامعة:</strong>
                <span>{profileData.university || 'غير محدد'}</span>
                </div>
                <div className="meta-item">
                <strong>🎓 التخصص:</strong>
                <span>{profileData.major || 'غير محدد'}</span>
                </div>
            </div>
            )}

            <div className="profile-bio-section">
            <h3>📄 النبذة التعريفية</h3>
            <p>{profileData.bio || 'لا توجد نبذة تعريفية مكتوبة بعد.'}</p>
            </div>
        </div>
        </div>
    );
    };

    export default ProfileView;