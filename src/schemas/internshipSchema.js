import * as yup from "yup";

export const internshipSchema = yup.object().shape({
  title: yup
    .string()
    .required("The internship title is required")
    .min(5, "The title must be at least 5 characters")
    .max(100, "The title is too long"),
    
description: yup
  .string()
  .required("Description is required")
  .max(500, "Description must be 500 characters or less"),

  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .integer("Capacity must be a whole number")
    .positive("Capacity must be greater than 0"),

  location: yup
    .string()
    .required("The location is required"),

  startDate: yup
    .date()
    .required("The start date is required")
    .typeError("The date is not valid"),

  endDate: yup
    .date()
    .required("The end date is required")
    .typeError("The date is not valid")
    .min(yup.ref("startDate"), "End date must be after the start date"),
});
