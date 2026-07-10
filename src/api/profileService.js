import apiClient from "./apiClient";
 export const getMyProfile = () => {
  return apiClient.get("/profile/me");
};

export const getInstitutionProfileById = (id) => {
  return apiClient.get(`/profile/institution/${id}`);
};

export const getStudentProfileById = (id) => {
  return apiClient.get(`/profile/student/${id}`);
};

export const updateInstitutionProfile = (profileData) => {
  return apiClient.put("/profile/institution", profileData);
};
 
export const updateStudentProfile = (profileData) => {
  return apiClient.put("/profile/student", profileData);
};