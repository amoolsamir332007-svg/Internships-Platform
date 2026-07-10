import { useState } from "react";
import "./StudentProfile.css";

const StudentProfile = () => {
    const [student] = useState({
        name: "Ahmed Mohammed",

        email: "ahmed@gmail.com",

        university: "Al-Azhar University",

        major: "Software Engineering",

        location: "Gaza, Palestine",
        skills:[
            "React.js",
            "JavaScript",
            "Tailwind CSS",
            "Git & GitHub"
        ],
        bio:
        "Software Engineering student passionate about frontend development and building modern web applications."
    });
    return (
        <div className="student-profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image">

                        <span>
                            AM
                        </span>

                    </div>

                    <div className="profile-info">
                        <h1>
                            {student.name}
                        </h1>
                        <p>
                            {student.major}
                        </p>
                        <span>
                            🎓 {student.university}
                        </span>
                    </div>

                    <button className="edit-btn">

                        Edit Profile
                    </button>
                </div>
                <div className="profile-grid">
                    <div className="profile-card">
                        <h2>
                            About Me
                        </h2>
                        <p>
                            {student.bio}
                        </p>
                    </div>
                    <div className="profile-card">
                        <h2>
                            Contact Information
                        </h2>
                        <div className="info-item">

                            📧 {student.email}

                        </div>
                        <div className="info-item">

                            📍 {student.location}

                        </div>
                    </div>

                    <div className="profile-card">
                        <h2>
                            Skills
                        </h2>

                        <div className="skills">
                            {
                                student.skills.map(
                                    (skill,index)=>(

                                    <span key={index}>

                                        {skill}

                                    </span>

                                    )

                                )
                            }
                        </div>
                    </div>

                    <div className="profile-card cv-card">

                        <h2>
                            Resume / CV
                        </h2>
                        <p>
                            Upload your CV to increase your chances of getting accepted.
                        </p>
                        <button>
                            Upload CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentProfile;