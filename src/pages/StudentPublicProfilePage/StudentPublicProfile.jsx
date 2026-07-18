import { useLocation, useNavigate } from "react-router-dom";
import "./StudentPublicProfile.css";

// Public, READ-ONLY student profile view (e.g. for an institution
// reviewing an applicant) — separate from StudentProfile.jsx (the
// student's own edit form).
//
// IMPORTANT BACKEND GAP: there is no confirmed "GET student profile by
// id" endpoint, so — same as the institution public view — this page
// can only render data it's handed directly via router state
// (`navigate(url, { state: { student } })`) from somewhere that already
// has that student's info (e.g. an application response, IF that
// response embeds full student profile data — this hasn't been
// confirmed against the live backend yet).
//
// To support this properly, the backend needs one of:
//  - a public GET /api/Student/{id}/profile endpoint, or
//  - the Institution applications endpoints to embed full student
//    profile fields (name, level, phoneNumber, gpa, bio) the same way
//    opportunities embed the institution object.
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
