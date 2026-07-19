import apiClient from "./apiClient";
export const applyToInternship = (opportunityId, notes = "") => {
  return apiClient.post(`/Student/applications`, {
    opportunityId,
    notes,
  });
};
export const getMyApplications = () => {
  return apiClient.get(`/Student/applications`);
};

export const withdrawApplication = (applicationId) => {
  return apiClient.patch(`/Student/applications/${applicationId}/withdraw`);
};
export const getApplicantsForInstitution = ({ opportunityId, status } = {}) => {
  const params = new URLSearchParams();
  if (opportunityId) params.append("opportunityId", opportunityId);
  if (status !== undefined && status !== null) params.append("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient.get(`/Institution/applications${query}`);
};

export const getApplicationsForOpportunity = (opportunityId) => {
  return apiClient.get(`/Institution/opportunities/${opportunityId}/applications`);
};

const DECISION = {
  APPROVED: 1,
  REJECTED: 2,
};

export const acceptApplication = (applicationId) => {
  return apiClient.patch(`/Institution/applications/${applicationId}/decision`, {
    decision: DECISION.APPROVED,
  });
};

export const rejectApplication = (applicationId) => {
  return apiClient.patch(`/Institution/applications/${applicationId}/decision`, {
    decision: DECISION.REJECTED,
  });
};
