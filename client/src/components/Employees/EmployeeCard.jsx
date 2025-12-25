import React from "react";

const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  if (!employee) return null;

  const avatar = employee.name
    ? employee.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "EM";

  return (
    <div className="bg-white/70 rounded-2xl shadow-lg border border-blue-200 p-5 flex items-start gap-4">
      <div className="min-w-[60px] min-h-[60px] rounded-full bg-gradient-to-tr from-blue-200 to-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl border border-white">
        {avatar}
      </div>
      <div className="flex-1">
        <div className="text-blue-700 font-bold text-lg">{employee.name || "Unknown"}</div>
        <div className="text-blue-500 text-sm">{employee.email}</div>
        <div className="text-blue-900 text-sm mt-1">
          <b>{employee.department}</b> — {employee.position}
        </div>
        <div className="text-blue-400 text-sm mt-1">Hire Date: {employee.hireDate}</div>
        <div className="mt-3 flex gap-2">
          {onView && <button className={btnStyle} onClick={() => onView(employee)}>View</button>}
          {onEdit && <button className={btnStyle} onClick={() => onEdit(employee)}>Edit</button>}
          {onDelete && <button className={btnStyleDel} onClick={() => onDelete(employee)}>Delete</button>}
        </div>
      </div>
    </div>
  );
};

const btnStyle = "bg-blue-100 text-blue-700 py-1 px-3 rounded-lg font-semibold hover:bg-blue-200 transition";
const btnStyleDel = "bg-red-100 text-red-700 py-1 px-3 rounded-lg font-semibold hover:bg-red-200 transition";

export default EmployeeCard;
