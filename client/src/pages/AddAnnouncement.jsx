import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAnnouncement } from "../api/announcementApi";

export default function AddAnnouncement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    audience: "all",
    isPinned: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAnnouncement(form);
      navigate("/announcements");
    } catch (err) {
      setError(err.response?.data?.message || "Error publishing announcement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-[#377eb7] hover:text-[#2a6699] mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to announcements
          </Link>
          <h1 className="text-3xl font-bold text-[#377eb7]">📢 New Announcement</h1>
          <p className="text-gray-600 mt-2">
            Create a new announcement to inform your teams.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Announcement Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8dbee1] focus:border-[#377eb7] transition-all outline-none"
              placeholder="E.g.: Monthly team meeting"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Announcement Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8dbee1] focus:border-[#377eb7] transition-all outline-none resize-none"
              placeholder="Describe your announcement in detail..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {form.content.length} characters
            </p>
          </div>

          {/* Audience */}
          <div>
            <label
              htmlFor="audience"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Target Audience
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "all", label: "All", icon: "👥" },
                { value: "employees", label: "Employees", icon: "👷" },
                { value: "managers", label: "Managers", icon: "👔" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    form.audience === option.value
                      ? "border-[#377eb7] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={option.value}
                    checked={form.audience === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-2xl mb-2">{option.icon}</span>
                  <span
                    className={`font-medium ${
                      form.audience === option.value
                        ? "text-[#377eb7]"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Pin option */}
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex-shrink-0 text-2xl">📌</div>
            <div className="flex-1">
              <label
                htmlFor="isPinned"
                className="font-semibold text-gray-700 cursor-pointer"
              >
                Pin this announcement
              </label>
              <p className="text-sm text-gray-500">
                Pinned announcements appear at the top of the list.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isPinned"
                name="isPinned"
                checked={form.isPinned}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#377eb7]"></div>
            </label>
          </div>

          {/* Submit buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              to="/announcements"
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-6 bg-gradient-to-r from-[#377eb7] to-[#8dbee1] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <span className="text-xl">📤</span>
                  Publish Announcement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
