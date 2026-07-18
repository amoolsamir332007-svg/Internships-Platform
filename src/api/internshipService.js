import apiClient from "./apiClient";
export const getPublished = () => {
  return apiClient.get(`/Student/opportunities`);
};


export const searchPublished = async (q) => {
  const response = await apiClient.get(`/Student/opportunities`);
  const query = (q || "").trim().toLowerCase();

  if (!query) {
    return response;
  }

  const allItems = response.data || [];
  const filtered = allItems.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const skills = Array.isArray(item.skills)
      ? item.skills.join(" ").toLowerCase()
      : (item.skills || "").toLowerCase();
    return title.includes(query) || skills.includes(query);
  });

  return { ...response, data: filtered };
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