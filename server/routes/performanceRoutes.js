import express from "express";
import {
  createPerformance,
  getPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance
} from "../controllers/performanceController.js";

const router = express.Router();

// Add performance
router.post("/", createPerformance);

// Get all performances
router.get("/", getPerformances);

// Get one performance
router.get("/:id", getPerformanceById);

// Update performance
router.put("/:id", updatePerformance);

// Delete performance
router.delete("/:id", deletePerformance);

export default router;
