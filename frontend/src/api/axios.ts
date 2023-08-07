import axios from "axios";

const baseURL: string =
  import.meta.env.MODE === "development"
    ? (import.meta.env.VITE_LOCAL_BACKEND_API as string)
    : (import.meta.env.VITE_BACKEND_API as string);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
