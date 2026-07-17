import apiClient from "./apiClient";

// Confirmed against the live swagger UI: GET /api/Opportunities/search?query=...
// The endpoint's only documented parameter is "query" (not required), so
// calling it with no query string returns everything.
export const getPublished = () => {
  return apiClient.get(`/Opportunities/search`);
};

export const searchPublished = (q) => {
  return apiClient.get(`/Opportunities/search?query=${encodeURIComponent(q || "")}`);
};

// Matches: POST /api/Institution/opportunities (confirmed in swagger)
// Confirmed body shape: { title, description, capacity, startDate, endDate, location }
export const createInternship = (internshipData) => {
  return apiClient.post("/Institution/opportunities", internshipData);
};

// --- Everything below has NO matching endpoint in the swagger docs we
// were given. The backend currently only supports: create an opportunity,
// and browse/search opportunities. There is no "list my own opportunities",
// "get by id", "update", "publish", "close", or "delete" route for
// opportunities. These are stubbed to fail loudly instead of silently
// hitting a wrong/404 URL, and the UI that calls them
// (ManageInternships, PostInternship's publish flow) has been adjusted
// to not depend on them. Once the backend adds these endpoints, wire the
// real paths in here.

const notSupportedByBackend = (featureName) => () =>
  Promise.reject(
    new Error(
      `${featureName} is not available yet — there is no matching backend endpoint for it.`
    )
  );

export const getMyInternships = notSupportedByBackend("Listing your opportunities");
export const getInternshipById = notSupportedByBackend("Viewing opportunity details");
export const updateInternship = notSupportedByBackend("Editing an opportunity");
export const publish = notSupportedByBackend("Publishing an opportunity");
export const closeInternship = notSupportedByBackend("Closing an opportunity");
export const deleteInternship = notSupportedByBackend("Deleting an opportunity");