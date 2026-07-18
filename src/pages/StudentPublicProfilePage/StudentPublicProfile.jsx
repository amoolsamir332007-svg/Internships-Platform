import { useLocation, useNavigate } from "react-router-dom";
import "./StudentPublicProfile.css";

const StudentPublicProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student || null;

  if (!student) {
    return (
      <div className="student-public-profile-page">
        <div className="student-public-profile-missing">
          <h2>Student profile isn't available directly</h2>
          <p>
            The backend doesn't currently expose a public "get student
            profile by id" endpoint, so this page can only show a
            student's information when you arrive here from a place that
            already has it in hand (e.g. their application), and only if
            that data includes the student's full profile.
          </p>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-public-profile-page">
      <div className="student-public-profile-header">
        <div className="student-public-profile-avatar">
          {student.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <h1>{student.name}</h1>
          <p>{student.level}</p>
        </div>
      </div>

      <div className="student-public-profile-grid">
        <div className="student-public-profile-card">
          <h3>About</h3>
          <p>{student.bio}</p>
        </div>
        <div className="student-public-profile-card">
          <h3>Details</h3>
          <div className="student-public-profile-item">📞 {student.phoneNumber}</div>
          <div className="student-public-profile-item">📊 GPA: {student.gpa}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentPublicProfile;
