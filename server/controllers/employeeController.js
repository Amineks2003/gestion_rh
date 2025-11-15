import Employee from '../config/models/employeeModel.js';
import User from '../config/models/userModel.js';

// Liste complète des employés
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('user', 'name email role')
      .populate('documents');
    res.json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Un seul employé (par ID)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('documents');
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employé non trouvé" });
    }
    res.json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Créer un employé + son user
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, department, position, phone, address, salary } = req.body;

    // Création user associé (optionnel : check email exist)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Création employé avec le user newUser._id
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
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update un employé (et le user associé)
export const updateEmployee = async (req, res) => {
  try {
    const { department, position, phone, address, salary, name, email } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: "Employé non trouvé" });

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
    res.status(500).json({ success: false, message: err.message });
  }
};

// Suppression employé
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: 'Employé non trouvé' });
    await Employee.findByIdAndDelete(req.params.id);

    // Optionnel : supprimer le user relié
    await User.findByIdAndDelete(employee.user);

    res.json({ success: true, message: 'Employé supprimé' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Trouver un employé par user
export const getEmployeeByUserId = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.params.userId })
      .populate('user', 'name email role')
      .populate('documents');
    if (!employee) return res.status(404).json({ success: false, message: "Employé non trouvé" });
    res.json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
