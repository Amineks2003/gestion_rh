import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeaveById } from '../../api/leaveApi'; // Ensure you added this function to API file

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

  if (!leave) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md mt-6">
       <h2 className="text-2xl font-bold mb-4">Leave Details</h2>
       <div className="space-y-4">
          <div>
              <p className="text-gray-500 font-bold">Type:</p>
              <p>{leave.leaveType}</p>
          </div>
          <div>
              <p className="text-gray-500 font-bold">Duration:</p>
              <p>{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</p>
          </div>
          <div>
              <p className="text-gray-500 font-bold">Reason:</p>
              <p>{leave.reason}</p>
          </div>
          <div>
              <p className="text-gray-500 font-bold">Status:</p>
              <p>{leave.status}</p>
          </div>
          {leave.adminComment && (
             <div className="bg-red-50 p-3 rounded">
                <p className="text-red-800 font-bold">Admin Comment:</p>
                <p className="text-red-700">{leave.adminComment}</p>
             </div>
          )}
       </div>
       <button 
         onClick={() => navigate('/leaves')} 
         className="mt-6 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
       >
         Back to List
       </button>
    </div>
  );
};

export default LeaveDetails;