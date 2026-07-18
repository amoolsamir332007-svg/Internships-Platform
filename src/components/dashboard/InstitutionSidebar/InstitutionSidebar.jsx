import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaPlusCircle, FaListAlt, FaUserFriends, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../utils/constants";
import "./InstitutionSidebar.css";

const LINKS = [
  { to: ROUTES.INSTITUTION_DASHBOARD, label: "Home", icon: <FaTachometerAlt />, end: true },
  { to: ROUTES.INSTITUTION_POST_INTERNSHIP, label: "Post Internship", icon: <FaPlusCircle /> },
  { to: ROUTES.INSTITUTION_MANAGE_INTERNSHIPS, label: "Manage Internships", icon: <FaListAlt /> },
  { to: ROUTES.INSTITUTION_APPLICANTS, label: "Applicants", icon: <FaUserFriends /> },
  { to: ROUTES.INSTITUTION_PROFILE, label: "Profile", icon: <FaBuilding /> },
];

const InstitutionSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="institution-sidebar">
      <div className="institution-sidebar-user">
        <div className="institution-sidebar-user-avatar">
          {(user?.institutionName || user?.fullName)?.charAt(0)?.toUpperCase() || "I"}
        </div>
        <div>
          <p className="institution-sidebar-user-name">
            {user?.institutionName || user?.fullName || "Institution"}
          </p>
          <p className="institution-sidebar-user-role">Institution</p>
        </div>
      </div>

      <nav className="institution-sidebar-nav">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `institution-sidebar-link ${isActive ? "institution-sidebar-link-active" : ""}`
            }
          >
            <span className="institution-sidebar-link-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="institution-sidebar-footer">
        <button className="institution-sidebar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default InstitutionSidebar;
