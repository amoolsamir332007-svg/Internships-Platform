import * as Yup from "yup";

const signupSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain letters and numbers"
    ),

  accountType: Yup.number()
    .required("Please select account type")
    .oneOf([1, 2], "Invalid account type"),

  address: Yup.string()
    .required("Address is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9+\-\s]{7,15}$/,
      "Phone number must be 7-15 digits and can include +, -, and spaces"
    ),

  level: Yup.string().when("accountType", {
    is: 1,
    then: (schema) => schema.required("Academic level is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default signupSchema;