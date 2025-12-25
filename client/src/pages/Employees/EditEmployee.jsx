import React, { useState, useEffect } from "react";
import { fetchEmployeeById, updateEmployee } from "../../api/employeeApi.js";
import EmployeeForm from "../../components/Employees/EmployeeForm.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeById(id).then(res => {
      const emp = res.data.employee;
      setValues({
        name: emp.user?.name || "",
        email: emp.user?.email || "",
        department: emp.department || "",
        position: emp.position || "",
        phone: emp.phone || "",
        address: emp.address || "",
      });
    });
  }, [id]);

  const handleChange = e => setValues({...values, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateEmployee(id, values);
      navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white/80 rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Edit Employee</h2>
        <EmployeeForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          editMode={true}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditEmployee;
