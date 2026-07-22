import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
});
console.log("API URL:", import.meta.env.VITE_API_URL);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response?.data?.detail) {
      return Promise.reject(
        new Error(error.response.data.detail)
      );
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timed out.")
      );
    }

    return Promise.reject(
      new Error("Something went wrong. Please try again.")
    );
  }
);

export default api;