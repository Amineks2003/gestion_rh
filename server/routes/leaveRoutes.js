import express from "express";
import {
  applyForLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();


// Employee submits leave
router.post("/", applyForLeave);

// Get all leaves (Admin / HR)
router.get("/", getAllLeaves);

// Get my leaves (for later when auth works)
router.get("/my-leaves", getMyLeaves);

// Update leave status
router.patch("/:id/status", updateLeaveStatus);

export default router;
