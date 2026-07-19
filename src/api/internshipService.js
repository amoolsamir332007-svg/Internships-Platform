import apiClient from "./apiClient";
export const getPublished = () => {
  return apiClient.get(`/Opportunities/search?query=e`);
};

export const searchPublished = (q) => {
  return apiClient.get(`/Opportunities/search?query=${encodeURIComponent(q || "")}`);
};

export const createInternship = (internshipData) => {
  return apiClient.post("/Institution/opportunities", internshipData);
};

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
