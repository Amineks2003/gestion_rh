import axios from "../utils/axios";

const API_URL = "/announcements";

// Fetch all announcements (public route)
export const fetchAnnouncements = () =>
  axios.get(`${API_URL}/public`);

// Fetch public announcements only
export const fetchPublicAnnouncements = () =>
  axios.get(`${API_URL}/public`);

// Create announcement (public route)
export const createAnnouncement = (data) =>
  axios.post(`${API_URL}/public`, data);

export const updateAnnouncement = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteAnnouncement = (id) =>
  axios.delete(`${API_URL}/${id}`);
