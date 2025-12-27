import User from "../models/userModel.js";

// GET PROFILE (current user)
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // user depuis le token
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// UPDATE PROFILE (current user)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, department, phone, address, salary, hireDate } = req.body;

    const updates = { name, email, department, phone, address, salary, hireDate };

    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    res.status(200).json({ message: "Profile updated", profile: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error: error.message });
  }
};
