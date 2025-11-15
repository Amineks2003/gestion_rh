import React, { useState } from "react";
import { createEmployee } from "../../api/employeeApi.js";
import EmployeeForm from "../../components/Employees/EmployeeForm";
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

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  };

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
    <div style={{
      minHeight:"100vh",
      background:'linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)',
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <div style={{
        background:"rgba(255,255,255,0.7)",
        borderRadius:"20px",
        padding:"2.2rem 2.5rem",
        maxWidth:500,
        boxShadow:"0 4px 18px rgba(141,190,225,0.13)",
        border:"1.5px solid #bff4ff"
      }}>
        <h2 style={{
          color:"#377eb7", fontWeight:"700", fontSize:"1.7rem", textAlign: "center", marginBottom:12
        }}>
          Add Employee
        </h2>
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
