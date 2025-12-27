import express from 'express';
import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  togglePin,
  deleteAnnouncement
} from '../controllers/announcementController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

// Get all announcements (with optional filters)
router.get('/', getAllAnnouncements);

// Get single announcement by ID
router.get('/:id', getAnnouncementById);

// Create a new announcement (protected)
router.post('/', userAuth, createAnnouncement);

// Update an announcement (protected)
router.put('/:id', userAuth, updateAnnouncement);

// Toggle pin status (protected)
router.patch('/:id/toggle-pin', userAuth, togglePin);

// Delete an announcement (protected)
router.delete('/:id', userAuth, deleteAnnouncement);

export default router;
