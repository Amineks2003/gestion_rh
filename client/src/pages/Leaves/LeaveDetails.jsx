import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeaveById } from '../../api/leaveApi';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
         const response = await getLeaveById(id);
         setLeave(response.data);
      } catch (err) {
         console.error(err);
      }
    };
    fetchLeave();
  }, [id]);

  if (!leave) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave Details</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 font-semibold">Type:</p>
          <p className="text-gray-900">{leave.leaveType}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Duration:</p>
          <p className="text-gray-900">{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Reason:</p>
          <p className="text-gray-900">{leave.reason}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Status:</p>
          <p className={`inline-block px-2 py-1 rounded-full text-sm font-semibold 
            ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
              leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {leave.status}
          </p>
        </div>
        {leave.adminComment && (
          <div className="bg-red-50 p-3 rounded">
            <p className="text-red-800 font-bold">Admin Comment:</p>
            <p className="text-red-700">{leave.adminComment}</p>
          </div>
        )}
      </div>
      <button onClick={() => navigate('/leaves')} className="mt-6 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition">
        Back to List
      </button>
    </div>
  );
};

export default LeaveDetails;
