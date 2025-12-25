import React from "react";

const DynamicListForm = ({ items, setItems, fields, addLabel }) => {
  const add = () => {
    const newItem = fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default }), {});
    setItems([...items, newItem]);
  };

  const update = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const remove = (i) => {
    setItems(items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="bg-gray-50 border rounded-xl p-5 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block font-semibold mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={item[f.name]}
                  onChange={(e) => update(i, f.name, e.target.value)}
                />
              ) : f.type === "select" ? (
                <select
                  className="w-full p-2 border rounded-lg"
                  value={item[f.name]}
                  onChange={(e) => update(i, f.name, e.target.value)}
                >
                  {f.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type}
                  className="w-full p-2 border rounded-lg"
                  value={item[f.name]}
                  onChange={(e) => update(i, f.name, e.target.value)}
                />
              )}
            </div>
          ))}
          <button
            onClick={() => remove(i)}
            type="button"
            className="text-red-600 font-semibold hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={add}
        type="button"
        className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
      >
        {addLabel}
      </button>
    </div>
  );
};

export default DynamicListForm;
