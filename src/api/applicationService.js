
import apiClient from "./apiClient";
export const applyToInternship = (internshipId, applicationData = {}) => {
  return apiClient.post(`/applications`, { internshipId, ...applicationData });
};
 
export const getMyApplications = (status) => {
  const query = status ? `?status=${status}` : "";
  return apiClient.get(`/applications/my${query}`);
};
 

export const withdrawApplication = (applicationId) => {
  return apiClient.delete(`/applications/${applicationId}`);
};
 
export const getApplicantsForInstitution = ({ internshipId, status } = {}) => {
  const params = new URLSearchParams();
  if (internshipId) params.append("internshipId", internshipId);
  if (status) params.append("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";
 
  return apiClient.get(`/applications/institution${query}`);
};
 
export const acceptApplication = (applicationId) => {
  return apiClient.patch(`/applications/${applicationId}/accept`);
};

export const rejectApplication = (applicationId) => {
  return apiClient.patch(`/applications/${applicationId}/reject`);
};
