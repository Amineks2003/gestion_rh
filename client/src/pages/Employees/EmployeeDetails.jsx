import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById } from "../../api/employeeApi.js";
import EmployeeCard from "../../components/Employees/EmployeeCard";

const palette = {
  background: 'linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)'
};

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

  if (loading)
    return <div style={{
      minHeight:"100vh",
      background:palette.background,
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}><span style={{color:"#299be9",fontSize:"1.3rem"}}>Loading...</span></div>;

  if (!employee)
    return <div style={{
      minHeight:"100vh",
      background:palette.background,
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}><span style={{color:"#b72525",fontSize:"1.3rem"}}>No employee found.</span></div>;

  return (
    <div style={{
      minHeight:"100vh",
      background:palette.background,
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <div style={{
        background:"rgba(255,255,255,0.7)",
        borderRadius:"22px",
        padding:"2.6rem 2.0rem",
        maxWidth:410,
        width:"98vw",
        boxShadow:"0 4px 22px rgba(141,190,225,0.13)",
        border:"1.2px solid #bff4ff",
        position:"relative"
      }}>
        <EmployeeCard employee={employee} />
        <div style={{
          marginTop:"1.7rem",
          color:"#299be9",
          fontSize:"1.02rem",
          wordBreak:"break-word"
        }}>
          <div><b>Phone:</b> {employee.phone || <span style={{color:"#b72525"}}>Not provided</span>}</div>
          <div><b>Address:</b> {employee.address || <span style={{color:"#b72525"}}>Not provided</span>}</div>
          <div><b>Salary:</b> {employee.salary ? `${employee.salary} €` : <span style={{color:"#b72525"}}>Not provided</span>}</div>
          <div><b>Internal ID:</b> {employee._id}</div>
          {/* Documents, etc. if you want */}
        </div>
        <button
          onClick={() => navigate("/employees")}
          style={{
            position:"absolute", top:15, right:18,
            background:"#8dbee1",
            color:"#1568a5",
            border:"none",
            borderRadius:"12px",
            fontWeight:"bold",
            padding:"0.38rem 1.2rem",
            cursor:"pointer"
          }}
        >Return</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
