import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAnnouncements, deleteAnnouncement } from "../api/announcementApi";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await fetchAnnouncements();
      // Handle both array response and object with data property
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setAnnouncements(data);
      setError(null);
    } catch (err) {
      console.error(err);
      // If not authenticated, show appropriate message
      if (err.response?.status === 401 || err.response?.data?.message?.includes("Not Authorized")) {
        setError("Please login to view announcements");
      } else {
        setError("Error loading announcements");
      }
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await deleteAnnouncement(id);
        setAnnouncements(announcements.filter((a) => a._id !== id));
      } catch (err) {
        alert("Error deleting announcement");
        console.error(err);
      }
    }
  };

  const getAudienceLabel = (audience) => {
    switch (audience) {
      case "all":
        return "All";
      case "employees":
        return "Employees";
      case "managers":
        return "Managers";
      default:
        return audience;
    }
  };

  const getAudienceColor = (audience) => {
    switch (audience) {
      case "all":
        return "bg-blue-100 text-blue-800";
      case "employees":
        return "bg-green-100 text-green-800";
      case "managers":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#377eb7]">📢 Announcements</h1>
            <p className="text-gray-600 mt-1">
              {announcements.length} announcement{announcements.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link
            to="/announcements/add"
            className="bg-gradient-to-r from-[#377eb7] to-[#8dbee1] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Announcement
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Announcements list */}
        {announcements.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No announcements</h2>
            <p className="text-gray-500 mb-6">There are no announcements published yet.</p>
            <Link
              to="/announcements/add"
              className="inline-block bg-[#377eb7] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a6699] transition-colors"
            >
              Create first announcement
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((a) => (
              <div
                key={a._id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  a.isPinned ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                {/* Pinned indicator */}
                {a.isPinned && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-1 text-sm font-medium flex items-center gap-2">
                    <span>📌</span>
                    Pinned Announcement
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[#377eb7] mb-2">{a.title}</h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getAudienceColor(
                          a.audience
                        )}`}
                      >
                        {getAudienceLabel(a.audience)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{a.content}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#377eb7] to-[#8dbee1] rounded-full flex items-center justify-center text-white font-semibold">
                        {(a.createdBy?.name || "HR").charAt(0).toUpperCase()}
                      </div>
                      <span>Published by {a.createdBy?.name || "HR"}</span>
                    </div>
                    <span>
                      {new Date(a.publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
