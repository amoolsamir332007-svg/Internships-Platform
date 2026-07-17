import apiClient from "./apiClient";

// Matches: POST /api/Student/applications (confirmed route in swagger)
// FLAG: the request-body schema for this endpoint wasn't captured in the
// screenshots. Guessing the field name is "opportunityId" (matching the
// resource's real name everywhere else in this API), NOT "internshipId"
// like the old code assumed. Confirm against the real schema.
export const applyToInternship = (opportunityId, applicationData = {}) => {
  return apiClient.post(`/Student/applications`, {
    opportunityId,
    ...applicationData,
  });
};

// Matches: GET /api/Student/applications (confirmed in swagger)
export const getMyApplications = (status) => {
  const query = status ? `?status=${status}` : "";
  return apiClient.get(`/Student/applications${query}`);
};

// Matches: PATCH /api/Student/applications/{id}/withdraw (confirmed in swagger)
// NOTE: method changed from DELETE to PATCH, and path changed to end in
// "/withdraw" instead of hitting the applications collection directly.
export const withdrawApplication = (applicationId) => {
  return apiClient.patch(`/Student/applications/${applicationId}/withdraw`);
};

// Matches: GET /api/Institution/applications (confirmed route exists, but
// its query parameters weren't shown in the swagger screenshot, so
// filtering by opportunityId/status here is UNVERIFIED — the backend may
// ignore these query params. If it does, use
// getApplicationsForOpportunity() below instead, which hits a route whose
// shape IS confirmed.
export const getApplicantsForInstitution = ({ opportunityId, status } = {}) => {
  const params = new URLSearchParams();
  if (opportunityId) params.append("opportunityId", opportunityId);
  if (status) params.append("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";

  return apiClient.get(`/Institution/applications${query}`);
};

// Matches: GET /api/Institution/opportunities/{opportunityId}/applications
// (confirmed in swagger) — use this to list applicants for one specific
// opportunity.
export const getApplicationsForOpportunity = (opportunityId) => {
  return apiClient.get(`/Institution/opportunities/${opportunityId}/applications`);
};

// Matches: PATCH /api/Institution/applications/{id}/decision (confirmed
// in swagger). Confirmed body shape: { decision: number }.
// FLAG: the meaning of the decision codes wasn't shown in the swagger
// screenshot (just an example value of 0). Assuming a common
// pending(0)/accepted(1)/rejected(2) enum below — CONFIRM this against
// the backend's actual enum before relying on it.
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
