import React, { useState } from "react";
import { createAnnouncement } from "../../api/announcementApi.js";
import { useNavigate } from "react-router-dom";
import { Pin, Users, ArrowLeft, Send } from "lucide-react";

const AddAnnouncement = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    audience: "all",
    isPinned: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      await createAnnouncement(formData);
      navigate("/announcements");
    } catch (err) {
      console.error("Error creating announcement:", err);
      setError(err.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8]">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/announcements")}
          className="flex items-center gap-2 text-[#377eb7] hover:text-[#2a6a9e] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Announcements</span>
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#377eb7] text-center mb-6">
            Create Announcement
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377eb7] focus:border-transparent transition"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your announcement content here..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377eb7] focus:border-transparent transition resize-none"
              />
            </div>

            {/* Audience */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Target Audience
              </label>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377eb7] bg-white transition"
              >
                <option value="all">Everyone</option>
                <option value="employees">Employees Only</option>
                <option value="managers">Managers Only</option>
              </select>
            </div>

            {/* Pin Toggle */}
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={formData.isPinned}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
              <span className="flex items-center gap-2 text-gray-700">
                <Pin className={`w-4 h-4 ${formData.isPinned ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                Pin this announcement
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#377eb7] text-white rounded-xl shadow-md hover:bg-[#2a6a9e] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Publish Announcement</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/announcements")}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
