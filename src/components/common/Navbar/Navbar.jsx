import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../../../hooks/useRole";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";


const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "__dashboard__", label: "Dashboard" },
  { to: "/contact", label: "Contact Us" },
  { to: "/applications", label: "Applications" },
];


const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isInstitution, isStudent } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };


  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const resolveLinkPath = (to) =>
    to === "__dashboard__" ? dashboardPath : to;


  return (

    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMobileMenu}>
          <span className="brand-icon">
            💼
          </span>
          <div>
          <h2 className="footer-logo navbar-brand-title">
            Intern<span>Ship</span>

          </h2>
            </div>
        </Link>

        <div
          className={`navbar-links ${
            mobileMenuOpen ? "active" : ""
          }`}
        >

          {NAV_LINKS.map((link) => {
            const path = resolveLinkPath(link.to);
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(path);

            return (
              <Link
                key={link.label}
                to={path}
                className={`navbar-link ${isActive ? "navbar-link-active" : ""}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mobile-auth-buttons">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="login-btn"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/get-started"
                  className="signup-btn"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className="nav-auth-buttons">
            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>
            <Link
              to="/get-started"
              className="signup-btn"
            >
              Sign Up
            </Link>
          </div>

        )}

        {isAuthenticated && (
          <div
            className="navbar-auth"
            ref={menuRef}
          >
            <div className="navbar-user">
              <button
                type="button"
                className="navbar-user-trigger"
                onClick={() => setMenuOpen(!menuOpen)}>
                <span className="navbar-user-avatar">
                  {
                    (
                      user?.institutionName ||
                      user?.name ||
                      "U"
                    )
                    .charAt(0)
                    .toUpperCase()
                  }
                </span>
                <span className="navbar-user-name">
                  {
                    user?.institutionName ||
                    user?.name ||
                    "Account"
                  }

                </span>
              </button>

             <AnimatePresence>
                {menuOpen && (

                  <motion.div
                    className="navbar-user-dropdown"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <button  className="menu-toggle"  onClick={() =>setMobileMenuOpen(!mobileMenuOpen) }
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {
            mobileMenuOpen
              ?
              <FaTimes />
              :
              <FaBars />
          }
        </button>
      </div>
    </nav>
  );
};


export default Navbar;
