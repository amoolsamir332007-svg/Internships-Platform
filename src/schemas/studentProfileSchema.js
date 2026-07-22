import * as yup from "yup";

const urlField = (label) =>
  yup
    .string()
    .trim()
    .url(`${label} must be a valid URL`)
    .max(255, `${label} is too long`)
    .nullable()
    .transform((value) => (value === "" ? null : value));

export const studentProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(150, "Email is too long"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s]{7,15}$/, "Phone number must be 7-15 digits and can include +, -, and spaces"),

  location: yup
    .string()
    .max(100, "Location is too long")
    .nullable(),

  level: yup
    .string()
    .required("Academic level is required")
    .max(50, "That's too long for an academic level"),

  university: yup
    .string()
    .required("University is required")
    .max(150, "University name is too long"),

  major: yup
    .string()
    .required("Major is required")
    .max(150, "Major is too long"),

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

  linkedinUrl: urlField("LinkedIn URL"),
  githubUrl: urlField("GitHub URL"),
  portfolioUrl: urlField("Portfolio URL"),

  skills: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .trim()
          .required("Skill can't be empty")
          .max(40, "Skill name is too long"),
      })
    )
    .max(20, "You can add up to 20 skills")
    .default([]),
});