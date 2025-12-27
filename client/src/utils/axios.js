import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    // 1. Get token from LocalStorage
    const token = localStorage.getItem("token");
    
    // 2. If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;
