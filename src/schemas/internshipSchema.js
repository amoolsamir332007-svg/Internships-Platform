import * as yup from "yup";
 
export const internshipSchema = yup.object().shape({
  title: yup
    .string()
    .required("The internship title is required")
    .min(5, "The title must be at least 5 characters")
    .max(100, "The title is too long"),
 
  description: yup
    .string()
    .required("The internship description is required")
    .min(30, "The description must be at least 30 characters")
    .max(2000, "The description is too long"),
 
  requirements: yup
    .string()
    .required("The internship requirements are required")
    .min(10, "The requirements must be at least 10 characters"),
 
  location: yup
    .string()
    .required("The location is required"),
 
  deadline: yup
    .date()
    .required("The application deadline is required")
    .min(new Date(), "The date must be in the future")
    .typeError("The date is not valid"),
 
  duration: yup
    .string()
    .required("The internship duration is required"),
 
  isPaid: yup
    .boolean()
    .required("You must specify if the internship is paid or not"),
});