import React, { useState, useEffect } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../../api/leaveApi';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('All');

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
    setCurrentFilter(status);
    setFilteredLeaves(status === 'All' ? leaves : leaves.filter(l => l.status === status));
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this leave?`)) return;
    try {
      await updateLeaveStatus(id, { status: newStatus });

      const updatedLeaves = leaves.map(l => l._id === id ? { ...l, status: newStatus } : l);
      setLeaves(updatedLeaves);
      setFilteredLeaves(currentFilter === 'All' ? updatedLeaves : updatedLeaves.filter(l => l.status === currentFilter));
    } catch (error) {
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7f0]">
        <span className="text-blue-600 text-lg font-semibold">Loading...</span>
      </div>
    );

  return (
    <div className="min-h-screen py-10 flex justify-center">
      <div className="w-full max-w-7xl px-8 space-y-6">

        <h2 className="text-3xl font-bold text-[#377eb7] text-center">
          Leave Requests Management
        </h2>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-3">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button 
              key={status}
              onClick={() => filterByStatus(status)}
              className={`px-5 py-2 rounded-xl transition-all font-medium shadow-sm
                ${currentFilter === status 
                  ? "bg-blue-600 text-white shadow-md transform scale-105" 
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto w-full shadow-xl rounded-2xl bg-white">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <tr>
                <th className="py-4 px-6 text-center font-bold">Employee</th>
                <th className="py-4 px-6 text-center font-bold">Leave Type</th>
                <th className="py-4 px-6 text-center font-bold">Duration</th>
                <th className="py-4 px-6 text-center font-bold">Reason</th>
                <th className="py-4 px-6 text-center font-bold">Status</th>
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map(leave => (
                  <tr key={leave._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-center">
                      {leave.employee?.name || "Unknown"}
                    </td>
                    <td className="py-4 px-6 text-center font-medium">{leave.leaveType}</td>
                    <td className="py-4 px-6 text-center text-sm">
                      {new Date(leave.startDate).toLocaleDateString()} <br />
                      <span className="text-gray-400">to</span> <br />
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="truncate max-w-[200px] mx-auto text-s" title={leave.reason}>
                        {leave.reason}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {leave.status === 'Pending' ? (
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(leave._id, 'Approved')}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-s font-semibold shadow transition"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(leave._id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-s font-semibold shadow transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-s italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LeaveList;
