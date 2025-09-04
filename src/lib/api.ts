import axios, { AxiosRequestConfig } from "axios";
import { authUtils, verifyToken } from "./auth";

// Base API configuration
const BASE_URL = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : "http://localhost:3000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 40000,
  withCredentials: true,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error);
    return Promise.reject(error);
  }
);

// Generic API request wrapper
async function apiRequest(endpoint: string, options?: AxiosRequestConfig) {
  try {
    const response = await apiClient({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const uploadFile = async (file: File, folder: string = "goyama") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return apiRequest("/api/upload", {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
