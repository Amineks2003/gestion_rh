import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPerformanceById, updatePerformance } from "../../api/performanceApi";
import ObjectivesForm from "../../components/Performance/ObjectivesForm";
import ScoresForm from "../../components/Performance/ScoresForm";

const EditPerformance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    period: "",
    objectives: [],
    scores: [],
    overallRating: 0,
    feedback: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPerformanceById(id);
        setForm({
          period: data.period || "",
          objectives: data.objectives || [],
          scores: data.scores || [],
          overallRating: data.overallRating || 0,
          feedback: data.feedback || "",
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Unable to load performance data." });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (form.overallRating < 0 || form.overallRating > 10) {
      setMessage({ type: "error", text: "Overall rating must be between 0 and 10." });
      return;
    }

    setUpdating(true);
    try {
      await updatePerformance(id, form);
      setMessage({ type: "success", text: "Performance updated successfully!" });
      setTimeout(() => navigate("/performance"), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update performance." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="mt-20 text-center text-gray-500">Loading data...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6">
      <h2 className="text-3xl font-bold text-[#377eb7] mb-6 text-center">Edit Performance Review</h2>

      {message && (
        <div className={`p-4 mb-6 rounded-xl ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Period</label>
          <input
            type="text"
            placeholder="Ex: Q1 2025"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Objectives</h3>
          <ObjectivesForm objectives={form.objectives} setObjectives={(obj) => setForm({ ...form, objectives: obj })} />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Scores</h3>
          <ScoresForm scores={form.scores} setScores={(scores) => setForm({ ...form, scores })} />
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow-inner space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Overall Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              className="w-40 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.overallRating}
              onChange={(e) => setForm({ ...form, overallRating: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Feedback</label>
            <textarea
              className="w-full h-28 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              placeholder="Add comments..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className={`w-full py-4 text-white font-bold text-lg rounded-2xl shadow-lg transition-all ${updating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {updating ? "Updating..." : "Update Performance"}
        </button>
      </form>
    </div>
  );
};

export default EditPerformance;
