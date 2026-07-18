import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DASHBOARD_ROUTE_BY_ROLE, ROUTES } from "../../utils/constants";
import { jwtDecode } from "jwt-decode";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import "./Login.css";
import api from "../../utils/api";
 
function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setError("");
        setLoading(true);
 
        try {
            const res = await api.post('Account/login', { email, password });
             const decoded = jwtDecode(res.data.token);
            const role =
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"] ||
                decoded.role;
 
            const userData = {
                email: res.data.email,
                fullName: decoded.FullName,
                role, 
             };
 
            login(userData, res.data.token);
             const targetRoute = DASHBOARD_ROUTE_BY_ROLE[role];
            navigate(targetRoute || ROUTES.HOME);
 
        } catch (er) {
            console.log(er.response?.data);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-side">
                    <h1>Welcome Back🚀</h1>
                    <p>Continue your internship journey and discover new opportunities.</p>
                    <div className="login-features">
                        <span>💼 Find Internship Opportunities</span>
                        <span>🚀 Build Your Career</span>
                        <span>🌎 Connect With Companies</span>
                    </div>
                </div>
                <div className="login-form">
                    <h2>Login</h2>
                    <p className="subtitle">Enter your account details</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="register-link">
                        Don't have an account?
                        <Link to="/get-started"> Create Account </Link>
                    </p>
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
}
 
export default Login;