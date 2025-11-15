import axios from "../utils/axios";

const API_URL = "/performance";

export const getPerformances = () => axios.get(API_URL);

export const getPerformanceById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createPerformance = (data) =>
  axios.post(API_URL, data);

export const updatePerformance = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deletePerformance = (id) =>
  axios.delete(`${API_URL}/${id}`);

// 🔹 New: fetch Employee by ID
export const getEmployeeById = (id) => axios.get(`/employees/${id}`);

// 🔹 New: fetch User/HR by ID
export const getUserById = (id) => axios.get(`/users/${id}`);