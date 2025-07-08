import axios from "axios";
import { getToken } from "@/utils/auth";

const API = axios.create({
  baseURL: "https:localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log("[RESPONSE]", response);
    return response;
  },
  (error) => {
    console.error("[RESPONSE ERROR]", error);
    return Promise.reject(error);
  }
);

export default API;