import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- 1. IMPORT ADDED
import { getAllLeaves, updateLeaveStatus } from '../../api/leaveApi';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch ALL leaves from the database when page loads
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await getAllLeaves();
        const data = response.data || response; 
        setLeaves(data);
        setFilteredLeaves(data);
      } catch (error) {
        console.error("Error fetching leaves", error);
        alert("Error: Could not load leave requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  // 2. Filter logic
  const filterByStatus = (status) => {
    if (status === 'All') {
      setFilteredLeaves(leaves);
    } else {
      setFilteredLeaves(leaves.filter(leave => leave.status === status));
    }
  };

  // 3. Handle Approve/Reject Actions
  const handleStatusUpdate = async (id, newStatus) => {
    if(!window.confirm(`Are you sure you want to ${newStatus} this leave?`)) return;
    try {
      await updateLeaveStatus(id, { status: newStatus });
      
      const updatedLeaves = leaves.map(leave => 
        leave._id === id ? { ...leave, status: newStatus } : leave
      );
      setLeaves(updatedLeaves);
      setFilteredLeaves(updatedLeaves); 
    } catch (error) {
      alert("Failed to update status. Please try again.");
    }
  };

  if(loading) return <div className="p-6">Loading leaves...</div>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leave Requests Management</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
          <button 
            key={status}
            onClick={() => filterByStatus(status)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition"
          >
            {status}
          </button>
        ))}
      </div>

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Employee</th>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Leave Type</th>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Duration</th>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Reason</th>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
              <th className="px-5 py-3 border-b-2 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4 text-gray-500">No leave requests found.</td></tr>
            ) : (
                filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                      <p className="text-gray-900 font-bold">{leave.user?.name || "Unknown"}</p>
                      <p className="text-gray-500 text-xs">{leave.user?.employeeId}</p>
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">{leave.leaveType}</td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                     {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                      <span className="truncate block max-w-xs" title={leave.reason}>{leave.reason}</span>
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {leave.status}
                    </span>
                  </td>

                  {/* --- 2. UPDATED ACTION COLUMN --- */}
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    <div className="flex items-center space-x-2">
                        {/* THE VIEW BUTTON */}
                        <Link 
                            to={`/leaves/${leave._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                        >
                            View
                        </Link>

                        {/* APPROVE/REJECT BUTTONS (Conditional) */}
                        {leave.status === 'Pending' && (
                            <>
                                <button 
                                onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                                >
                                Approve
                                </button>
                                <button 
                                onClick={() => handleStatusUpdate(leave._id, 'Rejected')}
                                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition"
                                >
                                Reject
                                </button>
                            </>
                        )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;