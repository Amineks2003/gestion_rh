import Employee from '../models/employeeModel.js';
import User from '../models/userModel.js';

// Liste complète des employés
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    // On renvoie directement les champs de Employee
    const employeesData = employees.map(emp => ({
      _id: emp._id,
      name: emp.name || "Unknown",
      email: emp.email || "-",
      department: emp.department,
      position: emp.position,
      phone: emp.phone,
      address: emp.address,
      salary: emp.salary,
      hireDate: emp.hireDate,
      documents: emp.documents || [],
    }));

    res.json({ success: true, employees: employeesData });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Un seul employé (par ID)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('documents');

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({
      success: true,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        phone: employee.phone,
        address: employee.address,
        salary: employee.salary,
        hireDate: employee.hireDate,
        documents: employee.documents || [],
      },
    });
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Créer un employé + son user
export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, position, phone, address, salary } = req.body;

    const employee = new Employee({
      name,
      email,
      department,
      position,
      phone,
      address,
      salary,
      documents: [],
    });

    await employee.save();
    res.status(201).json({ success: true, employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update un employé (et le user associé)
export const updateEmployee = async (req, res) => {
  try {
    const { name, email, department, position, phone, address, salary } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    if (name) employee.name = name;
    if (email) employee.email = email;
    if (department) employee.department = department;
    if (position) employee.position = position;
    if (phone) employee.phone = phone;
    if (address) employee.address = address;
    if (salary) employee.salary = salary;

    await employee.save();
    res.json({ success: true, employee });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Suppression employé + user associé
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Employee deleted' });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Trouver un employé par userId
export const getEmployeeByUserId = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.params.userId })
      .populate({ path: 'user', select: 'name email role', strictPopulate: false })
      .populate({ path: 'documents', strictPopulate: false });

    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    res.json({ success: true, employee });
  } catch (err) {
    console.error("Error fetching employee by userId:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
