import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById } from "../../api/employeeApi.js";
import EmployeeCard from "../../components/Employees/EmployeeCard.jsx";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeById(id)
      .then(res => setEmployee(res.data.employee))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <span className="text-blue-600 text-lg font-semibold">Loading...</span>
    </div>
  );

  if (!employee) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <span className="text-red-600 text-lg font-semibold">No employee found.</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white/80 rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-200 relative">
        <EmployeeCard employee={employee} />

        <div className="mt-5 text-blue-600 text-sm space-y-2">
          <div><b>Phone:</b> {employee.phone || <span className="text-red-600">Not provided</span>}</div>
          <div><b>Address:</b> {employee.address || <span className="text-red-600">Not provided</span>}</div>
          <div><b>Salary:</b> {employee.salary ? `${employee.salary} €` : <span className="text-red-600">Not provided</span>}</div>
          <div><b>Internal ID:</b> {employee._id}</div>
        </div>

        <button
          onClick={() => navigate("/employees")}
          className="absolute top-3 right-3 bg-blue-100 text-blue-700 font-bold py-1 px-4 rounded-xl hover:bg-blue-200 transition"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
