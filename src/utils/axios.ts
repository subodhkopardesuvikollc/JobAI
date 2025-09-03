import axios from "axios";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  });
  return instance;
};

export const debugAxiosInstance = () => {
  const instance = axiosInstance();
  console.group("🔍 Axios Instance Configuration");
  console.log("📍 Base URL:", instance.defaults.baseURL || "Not set");
  console.log("⏱️ Timeout:", instance.defaults.timeout || "Default");
  console.log("🔧 Headers:", instance.defaults.headers);
  console.log("🔄 Request Interceptors:", instance.interceptors.request);
  console.log("📥 Response Interceptors:", instance.interceptors.response);
  console.groupEnd();
};

export default axiosInstance;
