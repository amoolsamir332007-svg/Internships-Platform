import * as yup from "yup";

export const institutionProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("The institution name is required")
    .min(2, "The institution name must be at least 2 characters")
    .max(100, "The institution name is too long"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s]{7,15}$/, "Phone number must be 7-15 digits and can include +, -, and spaces"),

  address: yup
    .string()
    .required("Address is required"),
});
