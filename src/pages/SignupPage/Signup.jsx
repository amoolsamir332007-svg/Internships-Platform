import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import signupSchema from "../../schemas/signupSchema";
import { USER_ROLES } from "../../utils/constants";
import { DASHBOARD_ROUTE_BY_ROLE, ROUTES } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import { extractErrorMessage } from "../../utils/helpers";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import { registerUser, loginUser } from "../../api/authService";
import "./Signup.css";

const LEVEL_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const selectedRole =
    searchParams.get("role") || USER_ROLES.STUDENT;
  const isStudent = selectedRole !== "Institution";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    accountType: selectedRole === "Institution" ? 2 : 1,
    level: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    try {
      await signupSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        level: formData.accountType === 1 ? formData.level : null,
      };

      await registerUser(payload);
      try {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

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
      } catch (autoLoginError) {
       console.log(autoLoginError.response?.data);
        navigate("/Login");
      }
    } catch (er) {
      console.log(er.response?.data);
      setApiError(
        extractErrorMessage(
          er,
          "Something went wrong while creating your account. Please check your details and try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1>
            Create Your Account
          </h1>
          <p>
            Join Internship Platform as a
            <span> {selectedRole} </span>
          </p>

        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label> Full Name </label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" />
            <p> {errors.fullName} </p>
          </div>

          <div className="input-group">
            <label>
              Email Address
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" />
            <p>
              {errors.email}
            </p>
          </div>

          <div className="input-group">
            <label>
              Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" />
            <p>
              {errors.password}
            </p>

          </div>
          <div className="input-group">
            <label> address </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="type your addresss"
            />
            <p>{errors.address}</p>
          </div>
          <div className="input-group">
            <label> phoneNumber </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0590000000"
            />
            <p>{errors.phoneNumber}</p>
          </div>

          {isStudent && (
            <div className="input-group">
              <label> Level </label>
              <select name="level" value={formData.level} onChange={handleChange}>
                <option value="" disabled>Select level</option>
                {LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              <p>{errors.level}</p>
            </div>
          )}

          {apiError && <p className="signup-api-error">{apiError}</p>}

          <button className="signup-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="login-link">
          Already have account?
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>

      </div>
      <ScrollToTop />

    </div>
  );
};


export default Signup;