import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useRole } from "../../../hooks/useRole";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";


const Navbar = () => {

  const { user, isAuthenticated, logout } = useAuth();
  const { isInstitution, isStudent } = useRole();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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



  return (

    <nav className="navbar">

      <div className="navbar-container">


        {/* Brand */}

        <div className="brand">

          <div className="brand-icon">
            💼
          </div>


          <div>
            <h3>
              Internship
            </h3>

            <span>
              Platform
            </span>
          </div>

        </div>




        {/* Navigation Links */}

        <div
          className={`navbar-links ${
            mobileMenuOpen ? "active" : ""
          }`}
        >


          <Link
            to="/"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Home
          </Link>


          <Link
            to={dashboardPath}
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>


          <Link
            to="/contact"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>


          <Link
            to="/applications"
            className="navbar-link"
            onClick={closeMobileMenu}
          >
            Applications
          </Link>




          {/* Mobile Auth Buttons */}

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
                  to="/signup"
                  className="signup-btn"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>

              </>

            )}


          </div>


        </div>





        {/* Desktop Auth Buttons */}

        {!isAuthenticated && (

          <div className="nav-auth-buttons">


            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>


            <Link
              to="/signup"
              className="signup-btn"
            >
              Sign Up
            </Link>


          </div>

        )}






        {/* User Menu */}

        {isAuthenticated && (

          <div
            className="navbar-auth"
            ref={menuRef}
          >


            <div className="navbar-user">


              <button
                type="button"
                className="navbar-user-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
              >


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


          </div>

        )}







        {/* Mobile Menu Button */}

        <button

          className="menu-toggle"

          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }

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