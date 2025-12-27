import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../../api/employeeApi.js";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Department", field: "department" },
  { label: "Position", field: "position" },
  { label: "Hire Date", field: "hireDate" },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
        console.log("Employees API response:", res.data);
        const emp = res.data.employees.map((e) => ({
          _id: e._id,
          name: e.name || "Unknown", // plus de e.user
          email: e.email || "-",
          department: e.department || "-",
          position: e.position || "-",
          hireDate: e.hireDate ? new Date(e.hireDate).toLocaleDateString() : "-",
        }));
        setEmployees(emp);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (row) => {
    if (window.confirm("Delete this employee?")) {
      try {
        await deleteEmployee(row._id);
        setEmployees(employees.filter((e) => e._id !== row._id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete employee");
      }
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
      <div className="w-full max-w-6xl px-8 space-y-6">
        <h2 className="text-3xl font-bold text-[#377eb7] text-center">
          Employee Management
        </h2>
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/employees/add")}
            className="px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all"
          >
            + Add Employee
          </button>
        </div>

        <div className="overflow-x-auto w-full shadow-xl rounded-2xl bg-white">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.field}
                    className="py-4 px-6 text-center font-bold"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp._id} className="border-b hover:bg-gray-50 transition">
                    {columns.map((col) => (
                      <td key={col.field} className="py-4 px-6 text-center">
                        {emp[col.field]}
                      </td>
                    ))}
                    <td className="py-4 px-6 flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/employees/edit/${emp._id}`)}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="text-center py-6 text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
