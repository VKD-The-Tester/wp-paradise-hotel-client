import axios from "axios";

// HTTP Client Instance
const BACKEND_CLIENT = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

BACKEND_CLIENT.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default BACKEND_CLIENT;
