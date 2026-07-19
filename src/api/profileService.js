import apiClient from "./apiClient";
 
export const getInstitutionProfile = () => {
  return apiClient.get("/Institution/profile");
};
 
export const getStudentProfile = () => {
  return apiClient.get("/Student/profile");
};
 
export const updateInstitutionProfile = (profileData) => {
  return apiClient.put("/Institution/profile", profileData);
};
 
export const updateStudentProfile = (profileData) => {
  return apiClient.put("/Student/profile", profileData);
};
  
export const uploadStudentImage = (file) => {
  const fd = new FormData();
  fd.append("file", file);
 
  return apiClient.post("/Student/profile/image", fd, {
    headers: { "Content-Type": undefined },
  });
};
 
export const uploadStudentCv = (file) => {
  const fd = new FormData();
  fd.append("file", file);
 
  return apiClient.post("/Student/profile/cv", fd, {
    headers: { "Content-Type": undefined },
  });
};