import * as Yup from "yup";
const signupSchema = Yup.object({

    name: Yup.string()
        .required("Full name is required")
        .min(
            3,
            "Name must be at least 3 characters"
        ),

       email: Yup.string()
        .required("Email is required")
        .email(
            "Please enter a valid email address"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(
            8,
            "Password must be at least 8 characters"
        )
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)/,
            "Password must contain letters and numbers"
        ),

    confirmPassword: Yup.string()
        .required(
            "Please confirm your password"
        )

        .oneOf(
            [Yup.ref("password")],
            "Passwords do not match"

        ),
    role: Yup.string()
        .required(
            "Please select account type"
        )
        .oneOf(
            [
                "Student",
                "Institution"
            ],

           "Invalid account type"
        )
});



export default signupSchema;