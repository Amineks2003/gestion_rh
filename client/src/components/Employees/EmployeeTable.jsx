import React from "react";

// columns: [{label, field}], data: array of objects, actions: {onView, onEdit, onDelete}
const EmployeeTable = ({ columns, data, actions }) => (
  <div style={{
    background: "rgba(255,255,255,0.7)",
    borderRadius: "20px",
    padding: "1.2rem",
    boxShadow: "0 4px 18px rgba(141,190,225,0.10)",
    border: "1.5px solid #bff4ff",
    overflowX: "auto"
  }}>
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead>
        <tr style={{background:"#b1e5ff"}}>
          {columns.map(col => (
            <th key={col.field} style={{
              padding: "0.65rem 0.5rem",
              color: "#377eb7",
              fontWeight:"bold"
            }}>
              {col.label}
            </th>
          ))}
          <th style={{color:"#377eb7"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row._id} style={{textAlign:"center"}}>
            {columns.map(col => (
              <td key={col.field} style={{padding:"0.5rem"}}>
                {row[col.field]}
              </td>
            ))}
            <td>
              {actions?.onView && (
                <button style={actionBtn} title="View"
                  onClick={()=>actions.onView(row)}
                >👁️</button>
              )}
              {actions?.onEdit && (
                <button style={actionBtn} title="Edit"
                  onClick={()=>actions.onEdit(row)}
                >✏️</button>
              )}
              {actions?.onDelete && (
                <button style={actionBtn} title="Delete"
                  onClick={()=>actions.onDelete(row)}
                >🗑️</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const actionBtn = {
  background: "#8dbee1",
  border: "none",
  borderRadius: "12px",
  padding: "0.38rem 0.7rem",
  margin: "0 0.25rem",
  color: "#1568a5",
  fontSize: "1em",
  cursor: "pointer",
  transition: "background 0.18s",
};

export default EmployeeTable;
