import { useEffect, useState } from "react";
import { getPerformances, deletePerformance } from "../../api/performanceApi";
import { Link } from "react-router-dom";

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      loadData();
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer cette évaluation.");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
      <div className="max-w-6xl mx-auto p-8 mt-10 space-y-6">
        {/* Titre centré */}
        <h2 className="text-3xl font-bold text-[#377eb7] text-center">
          Performance Reviews
        </h2>

      <div className="flex justify-end">
        <Link
          to="/performance/add"
          className="px-4 sm:px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all"
        >
          + Add Review
        </Link>
      </div>

      {/* Table container with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
            <tr>
              <th className="py-3 px-4 text-center">Employee</th>
              <th className="py-3 px-4 text-center">Department</th>
              <th className="py-3 px-4 text-center">Position</th>
              <th className="py-3 px-4 text-center">Period</th>
              <th className="py-3 px-4 text-center">Final Rating</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {performances.length > 0 ? (
              performances.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-center">{p.employee?.user?.name || "—"}</td>
                  <td className="py-3 px-4 text-center">{p.employee?.department || "—"}</td>
                  <td className="py-3 px-4 text-center">{p.employee?.position || "—"}</td>
                  <td className="py-3 px-4 text-center">{p.period || "—"}</td>
                  <td className="py-3 px-4 text-center">{p.overallRating ?? "-"}</td>
                  <td className="py-3 px-4 flex justify-center gap-2 sm:gap-4 flex-wrap">
                    <Link to={`/performance/${p._id}`} className="text-blue-600 hover:underline text-xs sm:text-sm">View</Link>
                    <Link to={`/performance/edit/${p._id}`} className="text-green-600 hover:underline text-xs sm:text-sm">Edit</Link>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      className="text-red-600 hover:underline text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No performances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceList;
