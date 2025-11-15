import axios from "../utils/axios";

const API_URL = "/employees";

// Liste tous les employés
export const fetchEmployees = () => axios.get(API_URL);

// Détail d'un employé
export const fetchEmployeeById = (id) => axios.get(`${API_URL}/${id}`);

// Ajouter un employé
export const createEmployee = (data) => axios.post(API_URL, data);

// Modifier un employé
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Supprimer un employé
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

// Optionnel, par userId (utile si tu veux lier User → Employé)
export const fetchEmployeeByUserId = (userId) => axios.get(`${API_URL}/user/${userId}`);

