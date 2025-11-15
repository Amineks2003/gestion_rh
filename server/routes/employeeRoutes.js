import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByUserId
} from '../controllers/employeeController.js';
// import { verifyToken, isAdmin } from '../middlewares/verifyToken.js'; // À activer si tu veux sécuriser

const router = express.Router();

// Liste tous les employés
router.get('/', getAllEmployees);

// Get un employé par son ID
router.get('/:id', getEmployeeById);

// Créer un nouvel employé
router.post('/', createEmployee);

// Modifier un employé
router.put('/:id', updateEmployee);

// Supprimer un employé
router.delete('/:id', deleteEmployee);

// Get employé par userId
router.get('/user/:userId', getEmployeeByUserId);

export default router;
