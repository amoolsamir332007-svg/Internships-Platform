import { useLocation, useNavigate } from "react-router-dom";
import ProfileView from "../../components/profile/ProfileView/ProfileView";
import "./StudentPublicProfile.css";

const StudentPublicProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student || null;

  return (
    <div className="student-public-profile-page">
      {!student ? (
        <div className="student-public-profile-missing">
          <h2>Student profile isn't available directly</h2>
          <p>The backend doesn't currently expose a public profile endpoint.</p>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      ) : (
        <ProfileView profileData={student} role="student" />
      )}
    </div>
  );
};

export default StudentPublicProfile;