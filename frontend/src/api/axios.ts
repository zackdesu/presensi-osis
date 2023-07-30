import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
