import axios from "axios";
import { conf } from "./conf.js";

const axiosInstance = axios.create({
  baseURL: conf.apiDomain,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
