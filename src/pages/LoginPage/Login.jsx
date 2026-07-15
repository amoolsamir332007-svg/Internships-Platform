import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DASHBOARD_ROUTE_BY_ROLE } from "../../utils/constants";
import { jwtDecode } from "jwt-decode";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import "./Login.css";
import api from "../../utils/api";
import StudentDashboard from '../dashboardPage/StudentDash/StudentDashboard'
import InstitutionDashboard from "../dashboardPage/InstitutionDash/InstitutionDashboard";


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {


        if (dashboardRoute) {
            navigate(dashboardRoute);
        } else {
            navigate("/");
        }


        setError("");
        setLoading(true);
        console.log("I am in submit")

      try{
         console.log("I am in try")
      const res = await api.post('Account/login',{
      email,
      password
    })
     console.log("I am in succcess")

     login(res.data.user, res.data.token);
     const decoded = jwtDecode(res.data.token);



  const role = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"] || decoded.role;
  const normalizedRole = role?.toLowerCase();
  
  const targetRoute = DASHBOARD_ROUTE_BY_ROLE[normalizedRole];
  navigate(targetRoute || ROUTES.HOME);
   

    }catch(er){
      console.log(er.response?.data)
    }finally {
            // 6. إيقاف حالة التحميل دائماً سواء نجح الطلب أو فشل
            setLoading(false);
        }


    };

    }

    return (


        <div className="login-page">
            <div className="login-card">

                <div className="login-side">

                    <h1>
                        Welcome Back🚀
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


                        <Link to="/get-started">

                            Create Account

                        </Link>
                    </p>
                </div>
            </div>
            
            <ScrollToTop />
            
        </div>
    );


export default Login;