import React, { useState } from "react";
import { createEmployee } from "../../api/employeeApi.js";
import EmployeeForm from "../../components/Employees/EmployeeForm.jsx";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    address: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setValues({...values, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEmployee(values);
      navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white/80 rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-200">
        <h2 className="text-2xl font-bold text-[#377eb7] text-center mb-4">Add Employee</h2>
        <EmployeeForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddEmployee;
