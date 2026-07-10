import { Link } from "react-router-dom";
import "./Footer.css";
 

const Footer = () => {
  const year = new Date().getFullYear();
 
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">InternHub</span>
          <p className="footer-tagline">
            Connecting institutions and students with real internship
            opportunities.
          </p>
        </div>
 
        <div className="footer-links">
          <div className="footer-links-group">
            <span className="footer-links-title">Platform</span>
            <Link to="/">Home</Link>
            <Link to="/get-started">Get Started</Link>
            <Link to="/login">Login</Link>
          </div>
 
          <div className="footer-links-group">
            <span className="footer-links-title">Company</span>
            <Link to="/about">About</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
 
          <div className="footer-links-group">
            <span className="footer-links-title">Connect</span>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="mailto:contact@internhub.com">contact@internhub.com</a>
          </div>
        </div>
      </div>
 
      <div className="footer-bottom">
        <span>© {year} InternHub. All rights reserved.</span>
      </div>
    </footer>
  );
};
 
export default Footer;