import Leave from '../models/leaveModel.js'; 
// Note: Ensure leaveModel.js also uses "export default" or "export const"

// @desc    Apply for a new leave
// @route   POST /api/leaves
// @access  Private (Employee)
export const applyForLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const newLeave = new Leave({
      user: req.user.id,
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

// @desc    Get leaves for the logged-in user
// @route   GET /api/leaves/my-leaves
// @access  Private (Employee)
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({ createdAt: -1 });
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
    const leaves = await Leave.find({}).populate('user', 'name email').sort({ createdAt: -1 });
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
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};