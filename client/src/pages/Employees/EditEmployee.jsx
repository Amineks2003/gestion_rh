import React, { useState, useEffect } from "react";
import { fetchEmployeeById, updateEmployee } from "../../api/employeeApi.js";
import EmployeeForm from "../../components/Employees/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeById(id)
      .then(res => {
        const emp = res.data.employee;
        setValues({
          name: emp.user?.name || "",
          email: emp.user?.email || "",
          department: emp.department,
          position: emp.position,
          phone: emp.phone,
          address: emp.address,
        });
      });
  }, [id]);

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  };

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
          Modifier un Employé
        </h2>
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
