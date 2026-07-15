import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import signupSchema from "../../schemas/signupSchema";
import { USER_ROLES } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";
import api from "../../utils/api";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { signup } = useAuth();

  const selectedRole =
    searchParams.get("role") || USER_ROLES.STUDENT;

  const [formData, setFormData] = useState({
  email: "",
  password: "",
  fullName: "",       // 🟢 Changed from 'name' to 'fullName'
  accountType: selectedRole === "institution" ? 2 : 1,    // 🟢 Integer: 1 for Student, 2 for Employer, etc.
  level: "Freshman",  // 🟢 Added missing field
  gpa: 4.0,           // 🟢 Decimal/Number
  address: "bb",        // 🟢 Added missing field
  phoneNumber: "0533869500"     // 🟢 Added missing field
});
  const [errors, setErrors] = useState({});
  console.log(selectedRole)

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

    console.log("i am in submit")
    


  try {
     console.log("i am in try")
    const res = await api.post('Account/register', formData);
     console.log("i am in send the data")
     

    console.log(res.data);

  } catch (er) {
    console.log(er.response?.data);
 
  
    }
    navigate("/Login");
   
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
           <input
  name="fullName"        // ✅ matches state key
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Enter your name"
/>
            <p> {errors.name} </p>
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
            <label> address </label>
            <input
              type="address"
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
              type="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0590000000"
            />
            <p>{errors.password}</p>
          </div>

       

          
          <button className="signup-btn"> Create Account </button>
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