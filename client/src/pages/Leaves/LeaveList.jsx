import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllLeaves, updateLeaveStatus } from '../../api/leaveApi';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filterByStatus = (status) => {
    if (status === 'All') {
      setFilteredLeaves(leaves);
    } else {
      setFilteredLeaves(leaves.filter(leave => leave.status === status));
    }
  };

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

  if(loading) return <div className="p-6 text-center text-blue-600">Loading leaves...</div>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-md shadow-md max-w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
          Leave Requests Management
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button 
              key={status}
              onClick={() => filterByStatus(status)}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs sm:text-sm font-medium transition"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] sm:min-w-full leading-normal border-collapse">
          <thead>
            <tr>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Employee</th>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Leave Type</th>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Duration</th>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Reason</th>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Status</th>
              <th className="px-3 sm:px-5 py-2 border-b bg-gray-50 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 text-sm sm:text-base">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-50 transition">
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">
                    <p className="text-gray-900 font-bold">{leave.user?.name || "Unknown"}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{leave.user?.employeeId}</p>
                  </td>
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">{leave.leaveType}</td>
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">
                    <span className="truncate block max-w-[120px] sm:max-w-xs" title={leave.reason}>
                      {leave.reason}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">
                    <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold 
                      ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 border-b bg-white text-sm sm:text-base">
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to={`/leaves/${leave._id}`}
                        className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-blue-600 transition"
                      >
                        View
                      </Link>
                      {leave.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                            className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(leave._id, 'Rejected')}
                            className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-700 transition"
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
