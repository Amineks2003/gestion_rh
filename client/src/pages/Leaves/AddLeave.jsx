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

    <div className="max-w-full sm:max-w-2xl mx-auto bg-white p-4 sm:p-8 rounded-md shadow-md mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Leave Type</label>
          <select 
             name="leaveType" 
             onChange={handleChange} 
             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"

          >
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Earned Leave</option>
            <option>Unpaid Leave</option>
          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">From Date</label>
            <input 
              type="date" 
              name="startDate" 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">To Date</label>
            <input 
              type="date" 
              name="endDate" 
              onChange={handleChange} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Reason</label>
          <textarea 
            name="reason" 
            onChange={handleChange} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:outline-none" 
            rows="4" 
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full sm:w-auto sm:px-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >

        </button>
      </form>
    </div>
  );
};

export default AddLeave;
