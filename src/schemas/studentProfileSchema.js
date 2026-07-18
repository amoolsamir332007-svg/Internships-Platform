import * as yup from "yup";

export const studentProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long"),

  level: yup
    .string()
    .required("Academic level is required")
    .max(50, "That's too long for an academic level"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s]{7,15}$/, "Phone number must be 7-15 digits and can include +, -, and spaces"),

  gpa: yup
    .number()
    .typeError("GPA must be a number")
    .required("GPA is required")
    .min(0, "GPA can't be negative")
    .max(4, "GPA can't be higher than 4.0"),

  bio: yup
    .string()
    .required("Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio can't exceed 500 characters"),
});
