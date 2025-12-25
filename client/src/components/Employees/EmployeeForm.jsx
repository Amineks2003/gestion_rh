import React from "react";

const EmployeeForm = ({ values, onChange, onSubmit, editMode, loading }) => (
  <form className="max-w-md mx-auto space-y-4" onSubmit={onSubmit}>
    <div>
      <label className="font-semibold text-carolina-blue">Full Name:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="name"
        value={values.name || ""}
        onChange={onChange}
        placeholder="Full Name"
        required
      />
    </div>
    <div>
      <label className="font-semibold text-carolina-blue">Email:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        type="email"
        name="email"
        value={values.email || ""}
        onChange={onChange}
        placeholder="Email"
        required
      />
    </div>
    <div>
      <label className="font-semibold text-carolina-blue">Department:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="department"
        value={values.department || ""}
        onChange={onChange}
        placeholder="Department"
        required
      />
    </div>
    <div>
      <label className="font-semibold text-carolina-blue">Position:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="position"
        value={values.position || ""}
        onChange={onChange}
        placeholder="Position"
        required
      />
    </div>
    <div>
      <label className="font-semibold text-carolina-blue">Phone:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="phone"
        value={values.phone || ""}
        onChange={onChange}
        placeholder="Phone"
      />
    </div>
    <div>
      <label className="font-semibold text-carolina-blue">Address:</label>
      <input
        className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="address"
        value={values.address || ""}
        onChange={onChange}
        placeholder="Address"
      />
    </div>
    {!editMode && (
      <div>
        <label className="font-semibold text-carolina-blue">Password:</label>
        <input
          className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          name="password"
          value={values.password || ""}
          onChange={onChange}
          placeholder="Password"
          required
        />
      </div>
    )}
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 bg-blue-100 text-carolina-blue font-bold rounded-xl hover:bg-blue-200 transition"
    >
      {loading ? "Sending..." : editMode ? "Save" : "Add"}
    </button>
  </form>
);

export default EmployeeForm;
