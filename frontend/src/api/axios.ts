import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_BACKEND_API
    : import.meta.env.VITE_BACKEND_API;

if (!baseURL) console.error("Environment not Found!");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
