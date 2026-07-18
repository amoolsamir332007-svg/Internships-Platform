import apiClient from "./apiClient";

export const applyToInternship = (opportunityId, applicationData = {}) => {
  return apiClient.post(`/Student/applications`, {
    opportunityId,
    ...applicationData,
  });
};

export const getMyApplications = (status) => {
  const query = status ? `?status=${status}` : "";
  return apiClient.get(`/Student/applications${query}`);
};

export const withdrawApplication = (applicationId) => {
  return apiClient.patch(`/Student/applications/${applicationId}/withdraw`);
};

export const getApplicantsForInstitution = ({ opportunityId, status } = {}) => {
  const params = new URLSearchParams();
  if (opportunityId) params.append("opportunityId", opportunityId);
  if (status) params.append("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";

  return apiClient.get(`/Institution/applications${query}`);
};
export const getApplicationsForOpportunity = (opportunityId) => {
  return apiClient.get(`/Institution/opportunities/${opportunityId}/applications`);
};
const DECISION = {
  ACCEPTED: 1,
  REJECTED: 2,
};

export const acceptApplication = (applicationId) => {
  return apiClient.patch(`/Institution/applications/${applicationId}/decision`, {
    decision: DECISION.ACCEPTED,
  });
};

export const rejectApplication = (applicationId) => {
  return apiClient.patch(`/Institution/applications/${applicationId}/decision`, {
    decision: DECISION.REJECTED,
  });
};
