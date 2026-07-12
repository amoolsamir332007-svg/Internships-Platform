import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DASHBOARD_ROUTE_BY_ROLE } from "../../utils/constants";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {


        e.preventDefault();


        setError("");
        setLoading(true);

        const savedUser = JSON.parse(
            localStorage.getItem("registeredUser") || "null"
        );

        setTimeout(() => {

            if (!savedUser) {

                setError(
                    "No account found. Please create an account first."
                );
                setLoading(false);

                return;
            }
            const isValidUser =
                savedUser.email === email &&
                savedUser.password === password;

            if (!isValidUser) {


                setError(
                    "Invalid email or password."
                );


                setLoading(false);

                return;

            }
            const token = "jwt-demo-token";



            login(
                savedUser,
                token
            );

            const dashboardRoute =
                DASHBOARD_ROUTE_BY_ROLE[
                    savedUser.role
                ];

            if (dashboardRoute) {
                navigate(dashboardRoute);

            }

            else {
                navigate("/");
            }
            setLoading(false);
        },800);

    };

    return (


        <div className="login-page">


            <div className="login-card">



                <div className="login-side">


                    <h1>
                        Welcome Back 🚀
                    </h1>


                    <p>
                        Continue your internship journey
                        and discover new opportunities.
                    </p>

                    <div className="login-features">
                        <span>
                            💼 Find Internship Opportunities
                        </span>
                        <span>
                            🚀 Build Your Career
                        </span>

                        <span>
                            🌎 Connect With Companies
                        </span>
                    </div>
                </div>
                <div className="login-form">
                    <h2>
                        Login
                    </h2>
                    <p className="subtitle">
                        Enter your account details
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>
                                Email
                            </label>
                            <input

                                type="email"

                                placeholder="example@gmail.com"

                                value={email}

                                onChange={
                                    (e)=>setEmail(e.target.value)
                                }

                                required

                            />


                        </div>
                        <div className="input-group">


                            <label>
                                Password
                            </label>


                            <input

                                type="password"

                                placeholder="********"

                                value={password}

                                onChange={
                                    (e)=>setPassword(e.target.value)
                                }
                                required
                            />

                        </div>
                        {
                            error &&

                            <p className="error">
                                {error}
                            </p>

                        }
                        <button
                            disabled={loading}
                        >

                            {
                                loading
                                ?
                                "Logging in..."
                                :
                                "Login"
                            }


                        </button>
                    </form>

                    <p className="register-link">


                        Don't have an account?


                        <Link to="/signup">

                            Create Account

                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;