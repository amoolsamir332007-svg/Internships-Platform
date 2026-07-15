import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import signupSchema from "../../schemas/signupSchema";
import { USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { signup } = useAuth();

  const selectedRole =
    searchParams.get("role") || USER_ROLES.STUDENT;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    major: "",
    field: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);


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

  try {
    setLoading(true);
    setApiError("");

    await signupSchema.validate(
      {
        ...formData,
        role: selectedRole,
      },
      {
        abortEarly: false,
      }
    );


    const signupData = {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,

      accountType:
        selectedRole === USER_ROLES.STUDENT
          ? 0
          : 1,

      level:
        selectedRole === USER_ROLES.STUDENT
          ? formData.major
          : null,

      gpa:
        selectedRole === USER_ROLES.STUDENT
          ? 0
          : null,

      address:
        selectedRole === USER_ROLES.INSTITUTION
          ? formData.field
          : null,

      phoneNumber: null,
    };


    console.log("Sending signup data:", signupData);


    await signup(signupData);


    navigate("/login");


  } catch (error) {

    console.log(
      "Full API Error:",
      error.response?.data
    );


    if (error.inner) {

      const validationErrors = {};

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });

      setErrors(validationErrors);

    } else {

      const apiMessage =
        error.response?.data?.title ||
        error.response?.data?.message ||
        "Registration failed";

      setApiError(apiMessage);

    }

  } finally {

    setLoading(false);

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

            <label>
              Full Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <p>
              {errors.name}
            </p>

          </div>



          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />

            <p>
              {errors.email}
            </p>

          </div>



          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />

            <p>
              {errors.password}
            </p>

          </div>



          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
            />

            <p>
              {errors.confirmPassword}
            </p>

          </div>



          {selectedRole === USER_ROLES.STUDENT && (
            <>
              <div className="input-group">

                <label>
                  University
                </label>

                <input
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="Your university"
                />

              </div>


              <div className="input-group">

                <label>
                  Major
                </label>

                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  placeholder="Software Engineering"
                />

              </div>
            </>
          )}



          {selectedRole === USER_ROLES.INSTITUTION && (

            <div className="input-group">

              <label>
                Company Field
              </label>

              <input
                name="field"
                value={formData.field}
                onChange={handleChange}
                placeholder="Technology, Education..."
              />

            </div>

          )}



          {apiError && (
            <p className="error">
              {apiError}
            </p>
          )}



          <button
            className="signup-btn"
            disabled={loading}
          >

            {
              loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


        </form>



        <p className="login-link">

          Already have account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </p>


      </div>


      <ScrollToTop />

    </div>
  );
};


export default Signup;