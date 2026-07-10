import { NavLink } from "react-router-dom";
import "./InstitutionSidebar.css";
 
const LINKS = [
  { to: "/dashboard/institution", label: "Home", end: true },
  { to: "/dashboard/institution/post-internship", label: "Post Internship" },
  { to: "/dashboard/institution/manage-internships", label: "Manage Internships" },
  { to: "/dashboard/institution/applicants", label: "Applicants" },
  { to: "/dashboard/institution/profile", label: "Profile" },
];
 
const InstitutionSidebar = () => {
  return (
    <aside className="institution-sidebar">
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
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
 
export default InstitutionSidebar;