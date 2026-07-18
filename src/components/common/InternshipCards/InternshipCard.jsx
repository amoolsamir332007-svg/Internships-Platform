// عرض عنوان التدريب
// اسم المؤسسة
// وصف مختصر
// تاريخ النشر
// حالة التدريب
// زر التفاصيل

// InternshipCard.jsx
// Reusable card component for displaying internship information.
// Used in Home, Search results and Dashboard pages.

import "./InternshipCard.css";
import { useNavigate } from "react-router-dom";
import { formatDate , truncateText , getStatusColor} from "../../../utils/helpers";
const InternshipCard = ({internship,onClick}) => {
const navigate = useNavigate();

const goToInstitution = (e) => {
    e.stopPropagation();
    if (!internship.institution) return;
    navigate(`/institution/${internship.institutionID}`, {
        state: { institution: internship.institution },
    });
};

return (
<div className="internship-card">
    <div className="card-header">
        <h3>
            {internship.title}
        </h3>
        <span className={`status ${getStatusColor(internship.status)}`} >
            {internship.status}
        </span>
    </div>
    <div className="company-info" onClick={goToInstitution} style={{ cursor: internship.institution ? "pointer" : "default" }}>
        <span className="company-icon">
            🏢
        </span>
        <p>
        {internship.institution?.name ||"Unknown Institution"}
        </p>
    </div>
    <p className="description">
        { truncateText( internship.description,120)}
    </p>

    <div className="card-footer">
        <span className="date">
        📅 
        {
            formatDate(
                internship.createdAt
            )
        }
        </span>
        <button className="details-btn"  onClick={()=>onClick?.(internship)}>
            View Details
        </button>
    </div>
</div>
);
};



export default InternshipCard;