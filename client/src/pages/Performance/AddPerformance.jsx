import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createPerformance } from "../../api/performanceApi";
import ObjectivesForm from "../../components/Performance/ObjectivesForm";
import ScoresForm from "../../components/Performance/ScoresForm";
import { AppContent } from "../../context/appContext";

const AddPerformance = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent); // HR connecté

  const [form, setForm] = useState({
    employee: "",
    evaluatedBy: userData?._id || "", // prend directement l'ID du HR connecté
    period: "",
    objectives: [],
    scores: [],
    overallRating: 0,
    feedback: "",
  });

  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const periods = ["Q1", "Q2", "Q3", "Q4"].map(q => `${q} ${currentYear}`);

  useEffect(() => setEmployeeInfo(null), [form.employee]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.employee || !form.period) {
      setError("Employee and Period are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await createPerformance(form);
      if (res.data.employeeInfo) setEmployeeInfo(res.data.employeeInfo);
      navigate("/performance");
    } catch (err) {
      console.error(err);
      setError("Failed to create performance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">
      <h2 className="text-4xl font-bold text-[#377eb7] text-center">Add Performance Review</h2>
      {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

      <form onSubmit={submit} className="space-y-10">
        {/* Employee */}
        <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-bold text-carolina-blue text-xl">Employee</label>
            <select
              className="w-full mt-2 p-3 rounded-lg border border-uranian-blue focus:ring-2 focus:ring-light-sky-blue focus:outline-none"
              value={form.employee}
              onChange={(e) => setForm({ ...form, employee: e.target.value })}
            >
              <option value="">Select Employee</option>
              <option value="emp1">John Doe</option>
              <option value="emp2">Jane Smith</option>
            </select>
            {employeeInfo && (
              <div className="mt-2 text-gray-700">
                <p><strong>Name:</strong> {employeeInfo.name}</p>
                <p><strong>Department:</strong> {employeeInfo.department}</p>
                <p><strong>Position:</strong> {employeeInfo.position}</p>
              </div>
            )}
          </div>

          {/* Period */}
          <div>
            <label className="font-bold text-carolina-blue text-xl">Period</label>
            <select
              className="w-full mt-2 p-3 rounded-lg border border-uranian-blue bg-white text-gray-800 
                        focus:ring-2 focus:ring-light-sky-blue focus:outline-none shadow-sm"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
            >
              <option value="">Select Period</option>
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-carolina-blue">Objectives</h3>
          <ObjectivesForm
            objectives={form.objectives}
            setObjectives={(obj) => setForm({ ...form, objectives: obj })}
          />
        </div>

        {/* Scores */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-carolina-blue">Scores</h3>
          <ScoresForm
            scores={form.scores}
            setScores={(scores) => setForm({ ...form, scores })}
          />
        </div>

        {/* Rating & Feedback */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-bold mb-4 text-carolina-blue">Final Rating & Feedback</h3>
          <div>
            <label className="font-semibold text-uranian-blue">Overall Rating</label>
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
            <label className="font-semibold text-uranian-blue">Feedback</label>
            <textarea
              className="w-full h-28 mt-2 p-3 rounded-lg border border-carolina-blue focus:ring-2 focus:ring-carolina-blue focus:outline-none"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 text-white font-bold text-lg rounded-2xl shadow-lg transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-light-sky-blue hover:bg-uranian-blue"
          }`}
        >
          {loading ? "Saving..." : "Save Review"}
        </button>
      </form>
    </div>
  );
};

export default AddPerformance;
