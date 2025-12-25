import User from "../models/userModel.js";
import Employee from "../models/employeeModel.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const employee = await Employee.findOne({ user: id });

    res.status(200).json({ ...user.toObject(), ...(employee ? employee.toObject() : {}) });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, position, phone, address } = req.body;

    // 1. Update User (Name/Email)
    if (name || email) {
      await User.findByIdAndUpdate(id, { name, email });
    }

    // 2. Update Employee (Only allowed fields)
    const employeeUpdates = { department, position, phone, address };

    const updatedEmployee = await Employee.findOneAndUpdate(
      { user: id },
      { $set: employeeUpdates },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Profile updated", profile: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error: error.message });
  }
};