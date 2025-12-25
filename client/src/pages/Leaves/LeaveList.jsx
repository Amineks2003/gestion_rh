import React, { useState, useEffect } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../../api/leaveApi';
import { useNavigate } from 'react-router-dom';

const columns = [
  { label: "Employee", field: "name" },
  { label: "Leave Type", field: "leaveType" },
  { label: "Duration", field: "duration" },
  { label: "Reason", field: "reason" },
  { label: "Status", field: "status" },
];

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await getAllLeaves();
        const data = res.data || res;
        const mapped = data.map(l => ({
          ...l,
          name: l.user?.name || "Unknown",
          duration: `${new Date(l.startDate).toLocaleDateString()} - ${new Date(l.endDate).toLocaleDateString()}`,
        }));
        setLeaves(mapped);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch leaves");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    if(!window.confirm(`Are you sure you want to ${newStatus} this leave?`)) return;
    try {
      await updateLeaveStatus(id, { status: newStatus });
      const updated = leaves.map(l => l._id === id ? { ...l, status: newStatus } : l);
      setLeaves(updated);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7f0]">
      <span className="text-blue-600 text-lg font-semibold">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen py-10 flex justify-center">
      <div className="w-full max-w-6xl px-8 space-y-6">
        <h2 className="text-3xl font-bold text-[#377eb7] text-center">Leave Requests</h2>
        <div className="overflow-hidden shadow-xl rounded-2xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <tr>
                {columns.map(col => (
                  <th key={col.field} className="py-4 px-6 text-center font-bold">{col.label}</th>
                ))}
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {leaves.length > 0 ? leaves.map(l => (
                <tr key={l._id} className="border-b hover:bg-gray-50 transition">
                  {columns.map(col => (
                    <td key={col.field} className="py-4 px-6 text-center">
                      {col.field === "status" ? (
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold 
                          ${l.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            l.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {l.status}
                        </span>
                      ) : l[col.field]}
                    </td>
                  ))}
                  <td className="py-4 px-6 flex justify-center mt-2 gap-2">
                    {l.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(l._id, "Approved")}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(l._id, "Rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length+1} className="text-center py-6 text-gray-500">No leave requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
