import React, { useEffect, useState } from "react";
import { getPerformances, deletePerformance } from "../../api/performanceApi";
import { Link, useNavigate } from "react-router-dom";

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getPerformances();
      setPerformances(res.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les performances.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette évaluation ?")) return;
    try {
      await deletePerformance(id);
      setPerformances(performances.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer cette évaluation.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7f0]">
        <span className="text-blue-600 text-lg font-semibold">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7f0]">
        <span className="text-red-500 text-lg font-semibold">{error}</span>
      </div>
    );

  return (
    <div className="min-h-screen py-10 flex justify-center">
      <div className="w-full max-w-6xl px-8 space-y-6">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#377eb7] text-center">
          Performance Reviews
        </h2>

        {/* Add Button */}
        <div className="flex justify-end">
          <Link
            to="/performance/add"
            className="px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all"
          >
            + Add Review
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden shadow-xl rounded-2xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <tr>
                <th className="py-4 px-6 text-center font-bold">Employee</th>
                <th className="py-4 px-6 text-center font-bold">Department</th>
                <th className="py-4 px-6 text-center font-bold">Position</th>
                <th className="py-4 px-6 text-center font-bold">Period</th>
                <th className="py-4 px-6 text-center font-bold">Final Rating</th>
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {performances.length > 0 ? (
                performances.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-center">
                      {p.employee?.user?.name || "—"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {p.employee?.department || "—"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {p.employee?.position || "—"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {p.period || "—"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {p.overallRating ?? "-"}
                    </td>
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500"
                  >
                    No performance reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceList;