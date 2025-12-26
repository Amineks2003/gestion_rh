import express from "express";
import {
  createAnnouncement,
  createAnnouncementPublic,
  getAnnouncements,
  getAllAnnouncements,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

// Public routes
router.get("/public", getAllAnnouncements);
router.post("/public", createAnnouncementPublic);

// Protected routes
router.get("/", userAuth, getAnnouncements);
router.post("/", userAuth, createAnnouncement);
router.delete("/:id", userAuth, deleteAnnouncement);

export default router;
