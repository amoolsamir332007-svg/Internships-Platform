import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import signupSchema from "../../schemas/signupSchema";
import { USER_ROLES, STORAGE_KEYS } from "../../utils/constants";
import "./Signup.css";


const Signup = () => {


    const navigate = useNavigate();


    const [searchParams] = useSearchParams();



    const selectedRole =
        searchParams.get("role") || USER_ROLES.STUDENT;




    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        university: "",
        major: "",
        field: ""

    });





    const [errors, setErrors] = useState({});






    const handleChange = (e) => {


        const { name, value } = e.target;



        setFormData({

            ...formData,

            [name]: value

        });




        setErrors({

            ...errors,

            [name]: ""

        });


    };









    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            await signupSchema.validate(

                {
                    ...formData,
                    role: selectedRole
                },

                {
                    abortEarly: false
                }

            );







            const userData = {


                id: Date.now(),

                name: formData.name,

                email: formData.email,

                password: formData.password,

                university: formData.university,

                major: formData.major,

                field: formData.field,


                role: selectedRole


            };






            localStorage.setItem(

                STORAGE_KEYS.REGISTERED_USER,

                JSON.stringify(userData)

            );






            navigate("/login");



        }

        catch (error) {



            const validationErrors = {};



            error.inner.forEach((err) => {


                validationErrors[err.path] = err.message;


            });



            setErrors(validationErrors);



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

                        <span>
                            {" "}
                            {selectedRole}
                        </span>

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









                    {
                        selectedRole === USER_ROLES.STUDENT &&

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


                    }









                    {
                        selectedRole === USER_ROLES.INSTITUTION &&


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


                    }









                    <button className="signup-btn">


                        Create Account


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
        </div>
    );
};

export default Signup;