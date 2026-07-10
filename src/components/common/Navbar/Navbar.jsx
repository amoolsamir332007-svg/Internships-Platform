import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
 import { useRole } from "../../../hooks/useRole";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isInstitution, isStudent } = useRole();
  const navigate = useNavigate();
 
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const dashboardPath = isInstitution
    ? "/dashboard/institution"
    : isStudent
    ? "/dashboard/student"
    : "/login";
 
  const profilePath = isInstitution
    ? "/dashboard/institution/profile"
    : "/dashboard/student/profile";
 
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };
 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          InternHub
        </Link>
 
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to={dashboardPath} className="navbar-link">
            Dashboard
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact Us
          </Link>
          <Link to="/applications" className="navbar-link">
            Applications
          </Link>
        </div>
 
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="navbar-user" ref={menuRef}>
              <button
                type="button"
                className="navbar-user-trigger"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="navbar-user-avatar">
                  {(user?.institutionName || user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
                <span className="navbar-user-name">
                  {user?.institutionName || user?.name || "Account"}
                </span>
              </button>
 
              {menuOpen && (
                <div className="navbar-user-dropdown">
                  <Link
                    to={profilePath}
                    className="navbar-user-dropdown-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="navbar-user-dropdown-item navbar-user-dropdown-item-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;