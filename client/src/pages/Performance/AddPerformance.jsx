import { useState } from "react";
import { createPerformance } from "../../api/performanceApi";
import { useNavigate } from "react-router-dom";
import ObjectivesForm from "../../components/Performance/ObjectivesForm";
import ScoresForm from "../../components/Performance/ScoresForm";

const AddPerformance = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee: "",
    evaluatedBy: "",
    period: "",
    objectives: [],
    scores: [],
    overallRating: 0,
    feedback: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await createPerformance(form);
    navigate("/performance");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">
      <h2 className="text-4xl font-bold text-blue-500 text-center mb-6">
        Add Performance Review
      </h2>

      <form onSubmit={submit} className="space-y-10">
        
        {/* Employee Info Card */}
        <div className="bg-baby-powder rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Employee</label>
            <input
              type="text"
              className="w-full mt-2 p-3 rounded-lg border border-uranian-blue focus:ring-2 focus:ring-light-sky-blue focus:outline-none"
              value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Evaluated By (HR)</label>
            <input
              type="text"
              className="w-full mt-2 p-3 rounded-lg border border-uranian-blue focus:ring-2 focus:ring-light-sky-blue focus:outline-none"
              value={form.evaluatedBy}
              onChange={(e) => setForm({ ...form, evaluatedBy: e.target.value })}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Period</label>
            <input
              type="text"
              placeholder="T1 2025"
              className="w-full mt-2 p-3 rounded-lg border border-uranian-blue focus:ring-2 focus:ring-light-sky-blue focus:outline-none"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
            />
          </div>
        </div>

        {/* Objectives Card */}
        <div className="bg-non-photo-blue rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Objectives</h3>
          <ObjectivesForm
            objectives={form.objectives}
            setObjectives={(obj) => setForm({ ...form, objectives: obj })}
          />
        </div>

        {/* Scores Card */}
        <div className="bg-uranian-blue rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Scores</h3>
          <ScoresForm
            scores={form.scores}
            setScores={(scores) => setForm({ ...form, scores })}
          />
        </div>

        {/* Rating & Feedback Card */}
        <div className="bg-light-sky-blue rounded-2xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-bold mb-4">Final Rating & Feedback</h3>
          <div>
            <label className="font-semibold">Overall Rating</label>
            <input
              type="number"
              max={10}
              min={0}
              className="w-40 mt-2 p-3 rounded-lg border border-carolina-blue focus:ring-2 focus:ring-carolina-blue focus:outline-none ml-3"
              value={form.overallRating}
              onChange={(e) => setForm({ ...form, overallRating: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="font-semibold">Feedback</label>
            <textarea
              className="w-full h-28 mt-2 p-3 rounded-lg border border-carolina-blue focus:ring-2 focus:ring-carolina-blue focus:outline-none"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            />
          </div>
        </div>

        <button className="w-full py-4 text-white font-bold text-lg bg-carolina-blue hover:bg-light-sky-blue rounded-2xl shadow-lg transition-all">
          Save Review
        </button>
      </form>
    </div>
  );
};

export default AddPerformance;
