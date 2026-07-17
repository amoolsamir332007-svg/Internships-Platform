import apiClient from "./apiClient";

// Matches: GET /api/Institution/profile  (confirmed in swagger)
export const getInstitutionProfile = () => {
  return apiClient.get("/Institution/profile");
};

// Matches: GET /api/Student/profile  (confirmed in swagger)
export const getStudentProfile = () => {
  return apiClient.get("/Student/profile");
};

// Matches: PUT /api/Institution/profile  (confirmed in swagger)
// NOTE: the request-body schema for this endpoint wasn't visible in the
// swagger screenshots, so the field names below (institutionName,
// description, website, phone, location, logo) are UNVERIFIED. Confirm
// against the real schema before relying on this in production.
export const updateInstitutionProfile = (profileData) => {
  return apiClient.put("/Institution/profile", profileData);
};

// Matches: PUT /api/Student/profile  (confirmed in swagger)
// Confirmed body shape: { name, level, phoneNumber, gpa, bio }
export const updateStudentProfile = (profileData) => {
  return apiClient.put("/Student/profile", profileData);
};

// NOTE: there is no "get institution/student profile by id" endpoint in
// the swagger docs we were given (only the self "/profile" routes exist).
// Removed getInstitutionProfileById / getStudentProfileById since they
// pointed at routes that don't exist on the backend. If a public "view
// this institution's profile" feature is needed, that endpoint needs to
// be added to the backend first.
