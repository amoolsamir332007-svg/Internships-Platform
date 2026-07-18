import { Link} from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import {FaLinkedin,FaInstagram,FaGithub, FaEnvelope,FaArrowRight,} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand">
          <div className="brand-icon">
            💼
          </div>
           <h2 className="footer-logo">
            Intern<span>Ship</span>
          </h2>
          </div>
             <p>
            Connecting students with the best internship opportunities
            and helping companies discover talented developers.
          </p>

        <Link to={ROUTES.GET_STARTED} className="footer-btn">
              Get Started
              <FaArrowRight />
                </Link>
        </div>

        <div className="footer-column">
          <h3>Platform</h3>
          <Link to="/">Home</Link>
          <Link to={ROUTES.GET_STARTED}>
            Get Started
                </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

       <div className="footer-column contact">
          <h3>Contact</h3>
          <p>
            <FaEnvelope />
            contact@internship.com
          </p>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>
          © {year} Internshop. All rights reserved.
          <h3>
          Bissan Naser,
          Amal Hamdan,
          Alaa Alzhammar
          </h3>
        </p>
      </div>
    </footer>
  );
};
export default Footer;