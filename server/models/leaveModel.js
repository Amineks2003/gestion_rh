import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Changed from 'User' to 'Employee'
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Unpaid Leave'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: [
      function(value) {
        return this.startDate <= value;
      },
      'End date must be after or equal to start date',
    ],
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  adminComment: {
    type: String, // For HR to give a reason for rejection
    default: '',
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
