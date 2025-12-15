import axios from "axios";
import { BASE_API_URL } from "@/config/api";

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


