const ObjectivesForm = ({ objectives, setObjectives }) => {

  const add = () => {
    setObjectives([...objectives, { title: "", description: "", status: "En cours" }]);
  };

  const update = (i, field, value) => {
    const updated = [...objectives];
    updated[i][field] = value;
    setObjectives(updated);
  };

  const remove = (i) => {
    setObjectives(objectives.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">

      {objectives.map((obj, i) => (
        <div key={i} className="bg-gray-50 border rounded-xl p-5 space-y-4">

          <div>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={obj.title}
              onChange={(e) => update(i, "title", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              value={obj.description}
              onChange={(e) => update(i, "description", e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={obj.status}
              onChange={(e) => update(i, "status", e.target.value)}
            >
              <option>En cours</option>
              <option>Atteint</option>
              <option>Non atteint</option>
            </select>
          </div>

          <button
            onClick={() => remove(i)}
            type="button"
            className="text-red-600 font-semibold hover:underline"
          >
            Remove Objective
          </button>
        </div>
      ))}

      <button
        onClick={add}
        type="button"
        className="btn-secondary"
      >
        + Add Objective
      </button>
    </div>
  );
};

export default ObjectivesForm;
