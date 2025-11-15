import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../../api/employeeApi.js";
import EmployeeTable from "../../components/Employees/EmployeeTable";
import EmployeeCard from "../../components/Employees/EmployeeCard.jsx";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "Nom", field: "name" },
  { label: "Email", field: "email" },
  { label: "Département", field: "department" },
  { label: "Poste", field: "position" },
  { label: "Date d'entrée", field: "hireDate" },
];

const palette = {
  background: 'linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)'
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [viewCard, setViewCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then(res => {
        const emp = res.data.employees.map(e => ({
          _id: e._id,
          name: e.user?.name,
          email: e.user?.email,
          department: e.department,
          position: e.position,
          hireDate: new Date(e.hireDate).toLocaleDateString()
        }));
        setEmployees(emp);
      })
      .finally(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (row) => {
    if (window.confirm("Supprimer cet employé ?")) {
      await deleteEmployee(row._id);
      setEmployees(employees.filter(e => e._id !== row._id));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: palette.background,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "3rem"
    }}>
      <div style={{width:"95vw",maxWidth:970}}>
        <h2 style={{ color:"#377eb7", fontWeight:"700", fontSize:"2rem", marginBottom: 24 }}>
          Gestion des Employés
        </h2>
        <button
          onClick={() => navigate("/employees/add")}
          style={{
            background:"#8dbee1",
            color:"#1568a5",
            border:"none",
            borderRadius:"16px",
            padding:"0.7rem 1.3rem",
            fontWeight:"bold",
            marginBottom:"1.3rem",
            cursor:"pointer"
          }}
        >
          + Ajouter un employé
        </button>
        <EmployeeTable
          columns={columns}
          data={employees}
          actions={{
            onView: row => setViewCard(row),
            onEdit: row => navigate(`/employees/edit/${row._id}`),
            onDelete: handleDelete
          }}
        />
        {viewCard &&
          <div style={{
            position:"fixed",
            top:0,left:0,right:0,bottom:0,
            background:"rgba(0,0,0,0.12)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            zIndex:999
          }}>
            <div style={{position:'relative'}}>
              <EmployeeCard employee={viewCard}
                onEdit={() => {navigate(`/employees/edit/${viewCard._id}`);}}
                onDelete={() => handleDelete(viewCard)}
              />
              <button onClick={()=>setViewCard(null)}
                style={{position:"absolute",top:5,right:10,fontSize:"1.2rem",background:"none",border:"none",cursor:"pointer",color:"#b72525"}}>✖</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default EmployeeList;
