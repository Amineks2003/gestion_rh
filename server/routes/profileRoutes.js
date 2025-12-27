import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

// Récupérer et mettre à jour le profil du user connecté
router.get("/", userAuth, getProfile);
router.put("/", userAuth, updateProfile);

export default router;
