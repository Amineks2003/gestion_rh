import axios from "../utils/axios";

const API_URL = "/announcements";

// Get all announcements with optional filters
export const fetchAnnouncements = (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.audience) queryParams.append('audience', params.audience);
  if (params.search) queryParams.append('search', params.search);
  if (params.isPinned !== undefined) queryParams.append('isPinned', params.isPinned);
  
  const queryString = queryParams.toString();
  return axios.get(`${API_URL}${queryString ? `?${queryString}` : ''}`);
};

// Get single announcement by ID
export const fetchAnnouncementById = (id) => axios.get(`${API_URL}/${id}`);

// Create a new announcement
export const createAnnouncement = (data) => axios.post(API_URL, data);

// Update an announcement
export const updateAnnouncement = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Toggle pin status
export const toggleAnnouncementPin = (id) => axios.patch(`${API_URL}/${id}/toggle-pin`);

// Delete an announcement
export const deleteAnnouncement = (id) => axios.delete(`${API_URL}/${id}`);
