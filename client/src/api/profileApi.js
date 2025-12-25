// Ensure you are importing your configured axios
import axios from '../utils/axios'; 

export const fetchProfile = (id) => axios.get(`/profile/${id}`);
export const updateProfile = (id, data) => axios.put(`/profile/${id}`, data);