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

  useEffect(() => {
    const load = async () => {
      const data = await getPerformanceById(id);
      setPeriod(data.period);
      setObjectives(data.objectives || []);
      setScores(data.scores || []);
      setOverallRating(data.overallRating || 0);
      setFeedback(data.feedback || "");
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <p className="mt-20 text-center">Loading...</p>;

  const submit = async (e) => {
    e.preventDefault();

    await updatePerformance(id, {
      period,
      objectives,
      scores,
      overallRating,
      feedback,
    });

    navigate("/performance");
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6">

      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Edit Performance Review
      </h2>

      <form onSubmit={submit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">

        <div>
          <label className="form-label">Period</label>
          <input
            type="text"
            className="form-input"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>

        <div className="card-section">
          <h3 className="section-title">Objectives</h3>
          <ObjectivesForm objectives={objectives} setObjectives={setObjectives} />
        </div>

        <div className="card-section">
          <h3 className="section-title">Scores</h3>
          <ScoresForm scores={scores} setScores={setScores} />
        </div>

        <div className="card-section space-y-4">
          <label className="form-label">Overall Rating</label>
          <input
            type="number"
            className="form-input w-40"
            min="0"
            max="10"
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
          />

          <label className="form-label">Feedback</label>
          <textarea
            className="form-input h-28"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>

        <button className="btn-primary">Update Review</button>

      </form>
    </div>
  );
};

export default EditPerformance;
