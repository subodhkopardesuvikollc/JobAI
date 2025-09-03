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

export default axiosInstance;
