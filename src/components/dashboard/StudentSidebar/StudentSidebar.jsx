import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBriefcase, FaClipboardList, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../utils/constants";
import "./StudentSidebar.css";

const LINKS = [
  { to: ROUTES.STUDENT_DASHBOARD, label: "Dashboard", icon: <FaTachometerAlt />, end: true },
  { to: ROUTES.HOME, label: "Internships", icon: <FaBriefcase /> },
  { to: ROUTES.STUDENT_APPLICATIONS, label: "Applications", icon: <FaClipboardList /> },
  { to: ROUTES.STUDENT_PROFILE, label: "Profile", icon: <FaUser /> },
];

const StudentSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="student-sidebar">
      <div className="student-sidebar-user">
        <div className="student-sidebar-user-avatar">
          {user?.fullName?.charAt(0)?.toUpperCase() || "S"}
        </div>
        <div>
          <p className="student-sidebar-user-name">{user?.fullName || "Student"}</p>
          <p className="student-sidebar-user-role">Student</p>
        </div>
      </div>

      <nav className="student-sidebar-nav">
        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `student-sidebar-link ${isActive ? "student-sidebar-link-active" : ""}`
            }
          >
            <span className="student-sidebar-link-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="student-sidebar-footer">
        <button className="student-sidebar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;