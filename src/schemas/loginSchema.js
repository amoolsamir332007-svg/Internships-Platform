// loginSchema.js
// Validation schema for login form.
// Checks email and password before sending login request to backend.

// التأكد أن الإيميل موجود
// التأكد أن الإيميل بصيغة صحيحة
// التأكد أن كلمة المرور موجودة
// التأكد من الحد الأدنى لطول كلمة المرور

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