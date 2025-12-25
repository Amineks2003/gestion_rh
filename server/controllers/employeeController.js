import Employee from '../models/employeeModel.js';
import User from '../models/userModel.js';

// Liste complète des employés
export const getAllEmployees = async (req, res) => {
  try {
    // Chercher tous les employés
    const employees = await Employee.find();

    // Ajouter manuellement les infos user si elles existent
    const employeesWithUser = await Promise.all(
      employees.map(async (emp) => {
        let user = null;
        try {
          user = await User.findById(emp.user).select('name email role');
        } catch (err) {
          console.warn(`User not found for employee ${emp._id}`);
        }

        return {
          _id: emp._id,
          department: emp.department,
          position: emp.position,
          phone: emp.phone,
          address: emp.address,
          salary: emp.salary,
          hireDate: emp.hireDate,
          documents: emp.documents || [],
          user: user || { name: 'Unknown', email: '-' }
        };
      })
    );

    res.json({ success: true, employees: employeesWithUser });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Un seul employé (par ID)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate({ path: 'user', select: 'name email role', strictPopulate: false })
      .populate({ path: 'documents', strictPopulate: false });

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, employee });
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Créer un employé + son user
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, phone, address, salary } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Création user associé
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Création employé
    const employee = new Employee({
      user: newUser._id,
      department,
      position,
      phone,
      address,
      salary,
      documents: []
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
    const { department, position, phone, address, salary, name, email } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    // Update Employee fields
    if (department) employee.department = department;
    if (position) employee.position = position;
    if (phone) employee.phone = phone;
    if (address) employee.address = address;
    if (salary) employee.salary = salary;
    await employee.save();

    // Update User fields
    const user = await User.findById(employee.user);
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

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
    await User.findByIdAndDelete(employee.user);

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
