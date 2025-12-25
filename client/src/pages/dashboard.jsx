import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../api/employeeApi";
import { getPerformances } from "../api/performanceApi";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const empRes = await fetchEmployees();
        setEmployees(empRes.data.employees || []);

        const perfRes = await getPerformances();
        setPerformances(perfRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-blue-600">Loading dashboard...</p>;

  // Count objectives status
  const perfStatusCounts = { "Achieved": 0, "In Progress": 0, "Not Achieved": 0 };
  performances.forEach(p => {
    p.objectives?.forEach(o => {
      if (o.status in perfStatusCounts) perfStatusCounts[o.status]++;
    });
  });

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-[#377eb7] text-center mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 rounded-2xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-blue-700">Total Employees</h2>
          <p className="text-3xl font-extrabold mt-2">{employees.length}</p>
        </div>
        <div className="bg-green-100 rounded-2xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-green-700">Total Performance Reviews</h2>
          <p className="text-3xl font-extrabold mt-2">{performances.length}</p>
        </div>
      </div>

      {/* Performance Status */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Objectives Status</h2>
        <div className="flex space-x-4">
          {Object.entries(perfStatusCounts).map(([status, count]) => (
            <div key={status} className="flex-1 bg-gray-100 p-4 rounded-xl flex flex-col items-center">
              <span className="font-semibold">{status}</span>
              <span className="text-2xl font-bold mt-2">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Employees */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Employees</h2>
        {employees.length > 0 ? (
          <ul className="space-y-2">
            {employees.slice(-5).reverse().map(emp => (
              <li key={emp._id} className="border-b py-2 flex justify-between">
                <span>{emp.user?.name || "—"}</span>
                <span className="text-gray-500">{emp.department}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No employees found</p>
        )}
      </div>

      {/* Latest Performances */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Latest Performance Reviews</h2>
        {performances.length > 0 ? (
          <ul className="space-y-2">
            {performances.slice(-5).reverse().map(p => (
              <li key={p._id} className="border-b py-2 flex justify-between">
                <span>{p.employee?.user?.name || "—"}</span>
                <span className="text-gray-500">{p.period}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No performance reviews found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
