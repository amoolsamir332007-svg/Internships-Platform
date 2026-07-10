// studentProfileSchema.js
// Validation schema for student profile form.
// Validates student information before updating profile data.

// الاسم الكامل
// الجامعة
// التخصص
// رقم الهاتف
// نبذة عن الطالب
// المهارات
// رابط LinkedIn (اختياري)
// رابط GitHub (اختياري)

import * as Yup from "yup";

const studentProfileSchema = Yup.object({
    // Student name
    name: Yup.string()

        .required(
            "Full name is required"
        )

        .min(
            3,
            "Name must be at least 3 characters"
        ),
    // University name
    university: Yup.string()

        .required(
            "University is required"
        )

        .min(
            3,
            "University name is too short"
        ),
    // Major / Field
    major: Yup.string()

        .required(
            "Major is required"
        ),
    // Phone number
    phone: Yup.string()

        .required(
            "Phone number is required"
        )

        .matches(

            /^[0-9]{9,15}$/,

            "Please enter a valid phone number"

        ),
    // Student bio
    bio: Yup.string()

        .required(
            "Bio is required"
        )

        .min(

            20,

            "Bio must contain at least 20 characters"

        )

        .max(

            500,

            "Bio cannot exceed 500 characters"

        ),
    // Skills
    skills: Yup.string()

        .required(
            "Please add your skills"
        ),
    // LinkedIn URL (optional)
    linkedin: Yup.string()

        .url(
            "Enter a valid LinkedIn URL"
        )

        .nullable(),

    // Github URL (optional)
    github: Yup.string()

        .url(
            "Enter a valid Github URL"
        )

        .nullable()
});

export default studentProfileSchema;