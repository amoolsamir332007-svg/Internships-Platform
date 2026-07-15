import apiClient from "./apiClient";

export const loginUser = (credentials) => {
  return apiClient.post("/account/login", credentials);
};

export const registerUser = (formData) => {
  return apiClient.post("/account/register", formData);
};

export const getCurrentUser = () => {
  return apiClient.get("/account/me");
};

export const logoutUser = () => {
  return apiClient.post("/account/logout");
};