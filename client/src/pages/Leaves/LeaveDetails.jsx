import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeaveById } from '../../api/leaveApi';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
         const response = await getLeaveById(id);
         setLeave(response.data);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
    };
    fetchLeave();
  }, [id]);


  if (loading) return <div className="p-6 text-center text-blue-600">Loading leave details...</div>;
  if (!leave) return <div className="p-6 text-center text-gray-600">Leave not found.</div>;

  return (
    <div className="max-w-full sm:max-w-lg mx-auto bg-white p-4 sm:p-8 rounded-md shadow-md mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Leave Details</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="text-gray-500 font-bold">Type:</span>
          <span>{leave.leaveType}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="text-gray-500 font-bold">Duration:</span>
          <span>
            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="text-gray-500 font-bold">Reason:</span>
          <span className="break-words">{leave.reason}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="text-gray-500 font-bold">Status:</span>
          <span>{leave.status}</span>

        </div>
        {leave.adminComment && (
          <div className="bg-red-50 p-3 rounded">
            <p className="text-red-800 font-bold">Admin Comment:</p>

            <p className="text-red-700 break-words">{leave.adminComment}</p>
          </div>
        )}
      </div>
      <button 
        onClick={() => navigate('/leaves')} 
        className="mt-6 w-full sm:w-auto sm:px-6 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
      >

        Back to List
      </button>
    </div>
  );
};

export default LeaveDetails;
