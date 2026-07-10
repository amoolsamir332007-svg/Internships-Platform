import * as yup from "yup";
 
export const institutionProfileSchema = yup.object().shape({
  institutionName: yup
    .string()
    .required("The institution name is required")
    .min(2, "The institution name must be at least 2 characters")
    .max(100, "The institution name is too long"),
 
  description: yup
    .string()
    .required("The institution description is required")
    .min(20, "The institution description must be at least 20 characters")
    .max(1000, "The institution description is too long"),
 
  website: yup
    .string()
    .url("Url is not valid")
    .nullable()
    .notRequired(),
 
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s]{7,15}$/, "Phone Number must be 7-15 digits and can include +, -, and spaces"),
 
  location: yup
    .string()
    .required("location is required "),
 
  
  logo: yup
    .string()
    .nullable()
    .notRequired(),
});
 