import React from "react";

// Props: employee (object), onView (func), onEdit (func), onDelete (func)
const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  if (!employee) return null;

  const avatar = employee.user?.name
    ? employee.user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "EM";

  return (
    <div style={{
      background: "rgba(255,255,255,0.6)",
      borderRadius: "22px",
      boxShadow: "0 4px 24px rgba(141,190,225,0.17)",
      border: "1.5px solid #bff4ff",
      padding: "1.35rem 1rem 1rem 1rem",
      maxWidth: 320,
      margin: "1rem auto",
      display: "flex",
      alignItems: "center",
      gap: "1.1rem"
    }}>
      <div style={{
        minWidth: 62,
        minHeight: 62,
        borderRadius: "50%",
        background: "linear-gradient(145deg, #bff4ff, #8dbee1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1.6rem",
        color: "#299be9",
        border: "2px solid #f6f7f0"
      }}>
        {avatar}
      </div>
      <div style={{flex: "1"}}>
        <div style={{fontWeight:"bold", fontSize:"1.09rem", color:"#377eb7"}}>
          {employee.user?.name || "Employé inconnu"}
        </div>
        <div style={{fontSize:"0.96rem", color:"#299be9", marginBottom:4}}>
          {employee.user?.email}
        </div>
        <div style={{fontSize:"0.93rem",color:"#355f83"}}>
          <b>{employee.department}</b> — {employee.position}
        </div>
        <div style={{fontSize:"0.91rem", color:"#70b7db", marginBottom:4}}>
          Entré le : {new Date(employee.hireDate).toLocaleDateString()}
        </div>
        <div style={{marginTop:9}}>
          {onView && <button onClick={()=>onView(employee)} style={btnStyle}>View</button>}
          {onEdit && <button onClick={()=>onEdit(employee)} style={btnStyle}>Edit</button>}
          {onDelete && <button onClick={()=>onDelete(employee)} style={btnStyleDel}>Delete</button>}
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  marginRight: "0.66rem",
  background: "#8dbee1",
  color: "#1568a5",
  border: "none",
  borderRadius: "14px",
  padding: "0.40rem 1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.19s"
};

const btnStyleDel = {
  ...btnStyle,
  background: "#ffdbe0",
  color: "#b72525"
};

export default EmployeeCard;
