import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyForLeave } from '../../api/leaveApi';

const AddLeave = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForLeave(formData);
      navigate('/leaves');
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting leave");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
          <select 
            name="leaveType" 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Earned Leave</option>
            <option>Unpaid Leave</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">From Date</label>
            <input type="date" name="startDate" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">To Date</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Reason</label>
          <textarea name="reason" onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
