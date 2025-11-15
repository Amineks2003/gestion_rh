import { useEffect, useState } from "react";
import { getPerformances, deletePerformance } from "../../api/performanceApi";
import { Link } from "react-router-dom";

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getPerformances();
    setPerformances(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette évaluation ?")) {
      await deletePerformance(id);
      loadData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-500">Performance Reviews</h2>

        <Link
          to="/performance/add"
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all"
        >
          + Add Review
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden shadow-xl rounded-2xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
            <tr>
              <th className="py-4 px-6">Employee</th>
              <th className="py-4 px-6">Period</th>
              <th className="py-4 px-6">Final Rating</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {performances.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6">{p.employee?.fullname}</td>
                <td className="py-4 px-6">{p.period}</td>
                <td className="py-4 px-6">{p.overallRating ?? "-"}</td>
                <td className="py-4 px-6 flex justify-center gap-4">
                  
                  <Link
                    to={`/performance/${p._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>

                  <Link
                    to={`/performance/edit/${p._id}`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PerformanceList;
