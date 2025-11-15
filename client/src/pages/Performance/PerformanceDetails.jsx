import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerformanceById } from "../../api/performanceApi";

const statusColors = {
  "In Progress": "bg-light-sky-blue text-white",
  Achieved: "bg-uranian-blue text-white",
  "Not Achieved": "bg-carolina-blue text-white",
};

const PerformanceDetails = () => {
  const { id } = useParams();
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPerformanceById(id).then((data) => {
      setPerformance(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="mt-24 text-center text-gray-500">Loading...</p>;
  if (!performance) return <p className="mt-24 text-center text-gray-500">No data found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10 bg-baby-powder rounded-2xl shadow-lg">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-2 md:mb-0">Performance Details</h2>
        <Link
          to={`/performance/edit/${id}`}
          className="px-6 py-2 bg-uranian-blue text-white rounded-xl shadow-md hover:bg-light-sky-blue transition"
        >
          Edit
        </Link>
      </div>

      {/* Employee Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-2 border-l-4 border-uranian-blue">
        <p><span className="font-semibold text-gray-700">Employee:</span> {performance.employee?.fullname}</p>
        <p><span className="font-semibold text-gray-700">Period:</span> {performance.period}</p>
        <p>
          <span className="font-semibold text-gray-700">Overall Rating:</span> 
          <span className="ml-2 px-3 py-1 rounded-full font-semibold bg-light-sky-blue text-white">
            {performance.overallRating ?? "-"}
          </span>
        </p>
      </div>

      {/* Objectives */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Objectives</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performance.objectives.map((obj, i) => (
            <li key={i} className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <p className="font-semibold text-gray-800 mb-1">{obj.title}</p>
              <p className="text-gray-600 mb-2">{obj.description}</p>
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[obj.status]}`}>
                {obj.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scores */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Scores</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performance.scores.map((s, i) => (
            <li key={i} className="bg-white p-4 rounded-2xl border shadow-sm flex justify-between items-center hover:shadow-md transition">
              <span className="text-gray-700">{s.criteria}</span>
              <span className="font-semibold px-3 py-1 rounded-full bg-light-sky-blue text-white">{s.score}/10</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-carolina-blue">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Feedback</h3>
        <p className="text-gray-700 whitespace-pre-line">{performance.feedback}</p>
      </div>
    </div>
  );
};

export default PerformanceDetails;
