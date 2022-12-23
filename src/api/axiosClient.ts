import { AppVariables } from "@/config";
import axios from "axios";

const axiosClient = axios.create({
  //   baseURL: AppVariables.apiUrl,
  baseURL: "http://26.2.80.248:9091/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use();

export default axiosClient;
