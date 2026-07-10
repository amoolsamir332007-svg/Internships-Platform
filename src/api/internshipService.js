import apiClient from "./apiClient";
export const getPublished = (limit) => {
  return apiClient.get(`/internships/published?limit=${limit}`);
};

export const searchPublished = (q) => {
  return apiClient.get(`/internships/published/search?q=${encodeURIComponent(q)}`);
};
 
export const getInternshipById = (id) => {
  return apiClient.get(`/internships/${id}`);
};
 
export const getMyInternships = (status) => {
  const query = status ? `?status=${status}` : "";
  return apiClient.get(`/internships/my${query}`);
};
 
export const createInternship = (internshipData) => {
  return apiClient.post("/internships", internshipData);
};
 
export const updateInternship = (id, internshipData) => {
  return apiClient.put(`/internships/${id}`, internshipData);
};
 
export const publish = (id) => {
  return apiClient.patch(`/internships/${id}/publish`);
};
 
export const closeInternship = (id) => {
  return apiClient.patch(`/internships/${id}/close`);
};
 
export const deleteInternship = (id) => {
  return apiClient.delete(`/internships/${id}`);
};