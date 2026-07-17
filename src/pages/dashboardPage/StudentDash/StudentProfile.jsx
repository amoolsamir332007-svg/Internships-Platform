import "./StudentDash.css";


const StudentProfile =()=>{
return (
<div className="student-profile">
<div className="profile-cover">
<div className="avatar">A</div>
<h1>
Ahmed Mohammed
</h1>
<p>
Software Engineering Student
</p>
</div>

<div className="profile-info">

<div>

<h3>
Email
</h3>

<p>
ahmed@gmail.com
</p>

</div>
<div>
<h3>University</h3>
<p>Al-Azhar University</p>
</div>
<div>

<h3>Major</h3>
<p>Software Engineering</p>
</div>
</div>
<div className="skills-box">
<h2>Skills</h2>

<div className="skills">
<span>React</span>
<span>JavaScript</span>
<span>Tailwind</span>
<span>Git</span>
</div>
</div>

</div>
);
};
export default StudentProfile;