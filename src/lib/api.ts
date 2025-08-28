import axios, { AxiosRequestConfig } from "axios";

// Base API configuration
const BASE_URL = process.env.NODE_ENV === "production" ? "https://your-domain.com" : "http://localhost:3000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error.response?.data || error.message);
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

// Categories API functions
export const fetchCategories = async () => {
  return apiRequest("/api/categories");
};

export const fetchCategoryById = async (id: string) => {
  return apiRequest(`/api/categories/${id}`);
};

// Products API functions
export const fetchProducts = async (params?: { categoryId?: string; page?: number; limit?: number }) => {
  return apiRequest("/api/products", {
    method: "GET",
    params: params, // Axios handles URLSearchParams automatically
  });
};

export const fetchProductsByCategory = async (slug: string, page = 1, limit = 10) => {
  return apiRequest(`/api/products/category/${slug}`, {
    method: "GET",
    params: { page, limit },
  });
};

export const fetchProductById = async (id: string) => {
  return apiRequest(`/api/products/${id}`);
};

// Auth API functions
export const loginUser = async (email: string, password: string) => {
  return apiRequest("/api/auth", {
    method: "POST",
    data: {
      action: "login",
      email,
      password,
    },
  });
};

// Updated auth functions to handle cookies
export const logoutUser = async () => {
  return apiRequest("/api/auth", {
    method: "POST",
    data: { action: "logout" },
  });
};

export const registerUser = async (name: string, email: string, password: string) => {
  return apiRequest("/api/auth", {
    method: "POST",
    data: {
      action: "register",
      name,
      email,
      password,
    },
  });
};

export const createProduct = async (productData: any) => {
  return apiRequest("/api/products", {
    method: "POST",
    data: productData,
  });
};

export const updateProduct = async (id: string, productData: any) => {
  return apiRequest(`/api/products/${id}`, {
    method: "PUT",
    data: productData,
  });
};

export const deleteProduct = async (id: string) => {
  return apiRequest(`/api/products/${id}`, {
    method: "DELETE",
  });
};

export const createCategory = async (categoryData: any) => {
  return apiRequest("/api/categories", {
    method: "POST",
    data: categoryData,
  });
};

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

export const updateCategory = async (id: string, categoryData: any) => {
  return apiRequest(`/api/categories/${id}`, {
    method: "PUT",
    data: categoryData,
  });
};

export const deleteCategory = async (id: string) => {
  return apiRequest(`/api/categories/${id}`, {
    method: "DELETE",
  });
};
