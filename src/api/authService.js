import apiClient from "./apiClient";

export const loginUser = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const registerUser = (formData) => {
  return apiClient.post("/auth/register", formData);
};


export const getCurrentUser = () => {
  return apiClient.get("/auth/me");
};


export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};