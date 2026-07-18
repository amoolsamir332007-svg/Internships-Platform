import { useNavigate } from "react-router-dom";
import "./GetStarted.css";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
const GetStarted = () => {

    const navigate = useNavigate();
    const handleRoleSelect = (role) => {
        navigate(`/signup?role=${role}`);
    };
    return (
        <div className="getstarted-page">
          

            <section className="welcome-section">
                <h1>Welcome to <span>Internship Platform</span></h1>
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

            <ScrollToTop />
        </div>
        
    );

};
export default GetStarted;