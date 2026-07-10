import { useNavigate } from "react-router-dom";
import "./GetStarted.css";
const GetStarted = () => {

    const navigate = useNavigate();
    const handleRoleSelect = (role) => {
        navigate(`/signup?role=${role}`);


    };
    return (
        <div className="getstarted-page">
            <nav className="getstarted-navbar">
                <div className="brand">
                    <div className="brand-icon">
                        💼
                    </div>
                    <div>
                        <h3>Internship</h3>
                        <span>Platform</span>
                    </div>
                </div>
                <div className="login-area">
                    <span>Already have an account?</span>
                    <button onClick={() => navigate("/login")}>
                        Login
                    </button>
                </div>
            </nav>

            <section className="welcome-section">
                <h1>Welcome to<span>Internship Platform</span></h1>
                <p className="subtitle">
                    Which describes you best?
                </p>
                <p>
                    Choose the option that best fits you
                    to get started.</p>
            </section>

            <section className="roles-container">

                <div className="role-card institution">

                    <div className="role-icon">
                        🏢
                    </div>

                    <h2>Institution</h2>
                    <h4>Post opportunities & hire</h4>
                    <p>
                        Find and recruit talented students
                        for internships and traineeships.</p>
                    <button onClick={() => handleRoleSelect("institution")}>
                        I'm an Institution
                        <span>
                            →
                        </span>
                        </button>
                </div>

                {/* Student */}



                <div className="role-card student">
                    <div className="role-icon">
                        🎓
                    </div>
                    <h2>Student</h2>
                    <h4>Browse & apply</h4>
                    <p>
                        Discover internships and traineeships
                        that match your skills and career goals.
                    </p>

                    <button
                    onClick={() => handleRoleSelect("student")}
                    >
                        I'm a Student
                        <span>
                            →
                        </span>
                    </button>
                </div>
            </section>
            <div className="security-message">
                🔒 Your information is secure and never shared.
            </div>
        </div>
    );

};
export default GetStarted;