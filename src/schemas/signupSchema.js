// signupSchema.js
// Validation schema for signup form.
// Used to validate user registration data before sending it to backend.


// التأكد من الاسم
// التأكد من الإيميل
// كلمة المرور
// تأكيد كلمة المرور
// اختيار Role (Student / Institution)
// حقول إضافية حسب نوع المستخدم لاحقاً


import * as Yup from "yup";



const signupSchema = Yup.object({



    // User full name
    name: Yup.string()

        .required("Full name is required")

        .min(
            3,
            "Name must be at least 3 characters"
        ),





    // Email validation
    email: Yup.string()

        .required("Email is required")

        .email(
            "Please enter a valid email address"
        ),





    // Password validation
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





    // Confirm password
    confirmPassword: Yup.string()

        .required(
            "Please confirm your password"
        )

        .oneOf(

            [Yup.ref("password")],

            "Passwords do not match"

        ),






    // User role
    role: Yup.string()

        .required(
            "Please select account type"
        )

        .oneOf(

            [
                "student",
                "institution"
            ],

            "Invalid account type"

        )

});



export default signupSchema;