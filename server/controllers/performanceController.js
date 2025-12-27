import Performance from "../models/performanceModel.js";
import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";

// 📍 CREATE Performance
export const createPerformance = async (req, res) => {
  try {
    const employee = await Employee.findById(req.body.employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Ajouter les infos de l'employé directement
    const performanceData = {
      ...req.body,
      employee: employee._id,
      employeeName: employee.name,
      department: employee.department,
      position: employee.position,
    };

    const performance = await Performance.create(performanceData);

    res.status(201).json({
      message: "Performance created",
      performance,
      employeeInfo: {
        name: employee.name,
        department: employee.department,
        position: employee.position,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 📍 GET all Performances
export const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find()
      .populate("employee") // juste populate employee, sans user
      .populate("evaluatedBy"); // si évaluateur est un User

    res.status(200).json(performances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 📍 GET Performance by ID
export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate("employee")
      .populate("evaluatedBy");

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 📍 UPDATE Performance
export const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json({ message: "Performance updated successfully", performance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 📍 DELETE Performance
export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json({ message: "Performance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
