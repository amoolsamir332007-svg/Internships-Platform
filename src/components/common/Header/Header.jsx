import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          Find the internship that starts your career
        </h1>
        <p className="header-subtitle">
          Connect with institutions offering real internships and
          traineeships, build your profile once, and apply in a click.
        </p>
        <div className="header-actions">
          <Link to="/get-started" className="header-btn header-btn-primary">
            Start Free Account
          </Link>
          <Link to="/login" className="header-btn header-btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};
 
export default Header;
 