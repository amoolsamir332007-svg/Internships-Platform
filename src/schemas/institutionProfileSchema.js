import * as yup from "yup";

// Fields match what's CONFIRMED to exist on the backend's institution
// object (seen nested inside the live GET /api/Opportunities/search
// response: { instituationID, name, address, phoneNumber, email, ... }).
// We don't have a captured example of the PUT /api/Institution/profile
// request body itself, but these are the only institution fields we've
// actually seen the backend return, so the edit form is built around
// them rather than inventing description/website/logo/vision/mission
// fields the backend has no confirmed support for.
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
