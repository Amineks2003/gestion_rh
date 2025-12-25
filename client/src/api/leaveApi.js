import axios from "../utils/axios";

const API_URL = "/leaves"; // Matches the route we set in server.js

// 1. Submit a new leave request
export const applyForLeave = (data) => 
  axios.post(API_URL, data);

// 2. Get history of leaves for the logged-in user
export const getMyLeaves = () => 
  axios.get(`${API_URL}/my-leaves`);

// 3. Get ALL leaves (For the HR/Admin Dashboard)
export const getAllLeaves = () => 
  axios.get(API_URL);

// 4. Update status (Approve/Reject) - For HR/Admin
export const updateLeaveStatus = (id, data) => 
  axios.patch(`${API_URL}/${id}/status`, data);

// 5. (Optional) Get a single leave details by ID
export const getLeaveById = (id) => 
  axios.get(`${API_URL}/${id}`);