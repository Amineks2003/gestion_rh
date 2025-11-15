const ScoresForm = ({ scores, setScores }) => {

  const add = () => {
    setScores([...scores, { criteria: "", note: 0 }]);
  };

  const update = (i, field, value) => {
    const updated = [...scores];
    updated[i][field] = value;
    setScores(updated);
  };

  const remove = (i) => {
    setScores(scores.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">

      {scores.map((s, i) => (
        <div key={i} className="bg-gray-50 border rounded-xl p-5 space-y-4">

          <div>
            <label className="form-label">Criteria</label>
            <input
              className="form-input"
              value={s.criteria}
              onChange={(e) => update(i, "criteria", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Note (0–10)</label>
            <input
              type="number"
              min="0"
              max="10"
              className="form-input w-32"
              value={s.note}
              onChange={(e) => update(i, "note", e.target.value)}
            />
          </div>

          <button
            onClick={() => remove(i)}
            type="button"
            className="text-red-600 font-semibold hover:underline"
          >
            Remove Score
          </button>
        </div>
      ))}

      <button
        onClick={add}
        type="button"
        className="btn-secondary"
      >
        + Add Score
      </button>
    </div>
  );
};

export default ScoresForm;
