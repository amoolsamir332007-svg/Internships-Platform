// loginSchema.js
// Validation schema for login form.
// Checks email and password before sending login request to backend.
import * as Yup from "yup";
const loginSchema = Yup.object({
    // Email validation
    email: Yup.string()
        .required(
            "Email is required"
        )
        .email(
            "Please enter a valid email address"
        ),
    // Password validation
    password: Yup.string()
        .required(
            "Password is required"
        )
        .min(
            8,
            "Password must be at least 8 characters"
        )
});
export default loginSchema;