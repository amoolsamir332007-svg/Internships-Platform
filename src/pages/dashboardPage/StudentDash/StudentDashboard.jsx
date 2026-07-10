import {FaBriefcase,FaFileAlt,FaCheckCircle,FaClock} from "react-icons/fa";
import "./StudentDash.css";

const StudentDashboard = () => {

    const stats = [

        {
            title:"Applied Internships",
            number:12,
            icon:<FaFileAlt/>
        },

        {
            title:"Accepted",
            number:4,
            icon:<FaCheckCircle/>
        },

        {
            title:"Pending",
            number:5,
            icon:<FaClock/>
        },

        {
            title:"Available Jobs",
            number:28,
            icon:<FaBriefcase/>
        }

    ];

    const internships=[

        {
            title:"Frontend React Developer",
            company:"Tech Solutions",
            location:"Remote"
        },

        {
            title:"Full Stack Intern",
            company:"Digital Hub",
            location:"Gaza"
        },

        {
            title:"Software Engineer Intern",
            company:"Code Factory",
            location:"Remote"
        }

    ];

return (

<div className="student-dashboard">


<div className="dashboard-header">


<h1>
Welcome Back, Ahmed 🚀
</h1>
<p>Discover internships and build your future career.</p>

</div>
<div className="stats-grid">

{
stats.map((item,index)=>(

<div className="stat-card" key={index}>


<div className="stat-icon">

{item.icon}

</div>
<div>
<h3>
{item.number}
</h3>

<p>
{item.title}
</p>

</div>
</div>
))

}
</div>
<div className="dashboard-section">


<div className="section-title">

<h2>
Recommended Internships
</h2>


</div>
<div className="internship-grid">


{
internships.map((item,index)=>(

<div className="internship-card" key={index}>
<h3>
{item.title}
</h3>
<p>
🏢 {item.company}
</p>
<span>
📍 {item.location}
</span>

<button>
View Details
</button>


</div>
))

}
</div>
</div>

</div>
);

};
export default StudentDashboard;