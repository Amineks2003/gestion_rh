import React from "react";

// columns: [{label, field}], data: array of objects, actions: {onView, onEdit, onDelete}
const EmployeeTable = ({ columns, data = [], actions }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-100">
          {columns.map((col) => (
            <th
              key={col.field}
              className="px-4 py-2 text-left text-blue-700 font-bold border-b"
            >
              {col.label}
            </th>
          ))}
          <th className="px-4 py-2 text-blue-700 font-bold border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row._id} className="text-center border-b">
              {columns.map((col) => (
                <td key={col.field} className="px-4 py-2">
                  {row[col.field] || "-"}
                </td>
              ))}
              <td className="px-4 py-2">
                {actions?.onView && (
                  <button
                    className="bg-blue-200 text-blue-800 rounded px-2 py-1 mr-2"
                    onClick={() => actions.onView(row)}
                  >
                    👁️
                  </button>
                )}
                {actions?.onEdit && (
                  <button
                    className="bg-blue-200 text-blue-800 rounded px-2 py-1 mr-2"
                    onClick={() => actions.onEdit(row)}
                  >
                    ✏️
                  </button>
                )}
                {actions?.onDelete && (
                  <button
                    className="bg-red-200 text-red-800 rounded px-2 py-1"
                    onClick={() => actions.onDelete(row)}
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-4 text-gray-500"
            >
              No employees found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
