import Leave from '../models/leaveModel.js'; 
import Employee from '../models/employeeModel.js'; // Import Employee si besoin

// @desc    Apply for a new leave
// @route   POST /api/leaves
// @access  Private (Employee)
export const applyForLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Assure-toi que req.user.id correspond à l'ID de l'employee
    const newLeave = new Leave({
      employee: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get leaves for the logged-in employee
// @route   GET /api/leaves/my-leaves
// @access  Private (Employee)
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL leaves (For HR/Admin Dashboard)
// @route   GET /api/leaves
// @access  Private (Admin Only)
export const getAllLeaves = async (req, res) => {
  try {
    // Populate employee info instead of user
    const leaves = await Leave.find({})
      .populate('employee', 'name department position')
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update leave status (Approve/Reject)
// @route   PATCH /api/leaves/:id/status
// @access  Private (Admin Only)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const { id } = req.params;

    if (!['Approved', 'Rejected'].includes(status)) {
       return res.status(400).json({ message: "Invalid status update" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    ).populate('employee', 'name department position'); // Populate employee

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
