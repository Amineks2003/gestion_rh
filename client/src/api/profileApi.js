// utils/profileApi.js
import axios from "../utils/axios"; // ton axios déjà configuré

// Récupérer le profil du user connecté
export const fetchProfile = () => axios.get("/profile", { withCredentials: true });

// Mettre à jour le profil du user connecté
export const updateProfile = (data) => axios.put("/profile", data, { withCredentials: true });
