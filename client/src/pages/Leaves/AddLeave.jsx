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
      // Redirect back to the list after success
      navigate('/leaves');
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting leave");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Leave Type</label>
          <select 
             name="leaveType" 
             onChange={handleChange} 
             className="w-full mt-1 p-2 border rounded"
          >
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Earned Leave</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-gray-700">From Date</label>
                <input type="date" name="startDate" onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-gray-700">To Date</label>
                <input type="date" name="endDate" onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
            </div>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <textarea name="reason" onChange={handleChange} className="w-full mt-1 p-2 border rounded" rows="4" required></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit Application
        </button>
      </form>
    </div>
  );
};

export default AddLeave;