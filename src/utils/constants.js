export const USER_ROLES = {
  STUDENT: "Student",
  INSTITUTION: "Institution",
};

export const INTERNSHIP_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  CLOSED: "closed",
};
 
export const INTERNSHIP_STATUS_LABELS = {
  [INTERNSHIP_STATUS.DRAFT]: "Draft",
  [INTERNSHIP_STATUS.PUBLISHED]: "Published",
  [INTERNSHIP_STATUS.CLOSED]: "Closed",
};
 
export const APPLICATION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
};
 
export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUS.PENDING]: "Pending",
  [APPLICATION_STATUS.ACCEPTED]: "Accepted",
  [APPLICATION_STATUS.REJECTED]: "Rejected",
  [APPLICATION_STATUS.WITHDRAWN]: "Withdrawn",
};
 
export const PAID_OPTIONS = {
  PAID: true,
  UNPAID: false,
};
 
export const STORAGE_KEYS = {
  TOKEN: "token",
  REGISTERED_USER:"registeredUser",
};
 
export const ROUTES = {
  HOME: "/",
  GET_STARTED: "/get-started",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CONTACT: "/contact",
  ABOUT: "/about",
  TERMS: "/terms",
  APPLICATIONS: "/applications",
 
  INTERNSHIP_DETAIL: (id = ":id") => `/internships/${id}`,
  INSTITUTION_PROFILE_VIEW: (id = ":id") => `/institution/${id}`,
  STUDENT_PROFILE_VIEW: (id = ":id") => `/student/${id}`,
 
  INSTITUTION_DASHBOARD: "/dashboard/institution",
  INSTITUTION_POST_INTERNSHIP: "/dashboard/institution/post-internship",
  INSTITUTION_MANAGE_INTERNSHIPS: "/dashboard/institution/manage-internships",
  INSTITUTION_APPLICANTS: "/dashboard/institution/applicants",
  INSTITUTION_PROFILE: "/dashboard/institution/profile",
 
  STUDENT_DASHBOARD: "/dashboard/student",
  STUDENT_APPLICATIONS: "/dashboard/student/applications",
  STUDENT_PROFILE: "/dashboard/student/profile",
};
 
export const DASHBOARD_ROUTE_BY_ROLE = {
  [USER_ROLES.INSTITUTION]: ROUTES.INSTITUTION_DASHBOARD,
  [USER_ROLES.STUDENT]: ROUTES.STUDENT_DASHBOARD,
};
