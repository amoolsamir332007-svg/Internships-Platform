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
import { formatDate , truncateText , getStatusColor} from "../../../utils/helpers";
const InternshipCard = ({internship,onClick}) => {

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
    <div className="company-info">
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