import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerformanceById, updatePerformance } from "../../api/performanceApi";
import ObjectivesForm from "../../components/Performance/ObjectivesForm";
import ScoresForm from "../../components/Performance/ScoresForm";

const EditPerformance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [period, setPeriod] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [scores, setScores] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPerformanceById(id);
        setPeriod(data.period);
        setObjectives(data.objectives || []);
        setScores(data.scores || []);
        setOverallRating(data.overallRating || 0);
        setFeedback(data.feedback || "");
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage({ type: "error", text: "Unable to load performance data." });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (overallRating < 0 || overallRating > 10) {
      setMessage({ type: "error", text: "Overall rating must be between 0 and 10." });
      return;
    }

    setUpdating(true);
    try {
      await updatePerformance(id, { period, objectives, scores, overallRating, feedback });
      setMessage({ type: "success", text: "Performance updated successfully!" });
      setTimeout(() => navigate("/performance"), 1500);
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ type: "error", text: "Failed to update performance." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="mt-20 text-center text-gray-500">Loading data...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Edit Performance Review
      </h2>

      {message && (
        <div
          className={`p-4 mb-6 rounded-xl ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">

        {/* Period */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Period</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="Ex: Q1 2025"
          />
        </div>

        {/* Objectives */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Objectives</h3>
          <ObjectivesForm objectives={objectives} setObjectives={setObjectives} />
        </div>

        {/* Scores */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Scores</h3>
          <ScoresForm scores={scores} setScores={setScores} />
        </div>

        {/* Overall Rating & Feedback */}
        <div className="bg-blue-50 p-4 rounded-xl shadow-inner space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Overall Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              className="w-40 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={overallRating}
              onChange={(e) => setOverallRating(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Feedback</label>
            <textarea
              className="w-full h-28 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add comments about the performance..."
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-4 text-white font-bold text-lg rounded-2xl shadow-lg transition-all ${
            updating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Performance"}
        </button>
      </form>
    </div>
  );
};

export default EditPerformance;
