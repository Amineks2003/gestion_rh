import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { 
  applyForLeave, 
  getMyLeaves, 
  getAllLeaves, 
  updateLeaveStatus 
} from '../controllers/leaveController.js';

const router = express.Router();

// Routes for regular employees
router.post('/', verifyToken, applyForLeave);
router.get('/my-leaves', verifyToken, getMyLeaves);

// Routes for HR/Admin
router.get('/', verifyToken, getAllLeaves);
router.patch('/:id/status', verifyToken, updateLeaveStatus);

// 🔹 THIS WAS THE MISSING PART:
export default router;