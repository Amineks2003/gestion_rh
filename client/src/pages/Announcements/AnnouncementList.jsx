import React, { useEffect, useState } from "react";
import { fetchAnnouncements, deleteAnnouncement, toggleAnnouncementPin } from "../../api/announcementApi.js";
import { useNavigate } from "react-router-dom";
import { Pin, Search, Filter, Trash2, Edit, Eye, Plus } from "lucide-react";

const audienceColors = {
  all: "bg-blue-100 text-blue-800",
  employees: "bg-green-100 text-green-800",
  managers: "bg-purple-100 text-purple-800",
};

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (audienceFilter) params.audience = audienceFilter;
      
      const res = await fetchAnnouncements(params);
      setAnnouncements(res.data.announcements || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, [audienceFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadAnnouncements();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const res = await toggleAnnouncementPin(id);
      setAnnouncements(
        announcements.map((a) =>
          a._id === id ? { ...a, isPinned: res.data.announcement.isPinned } : a
        ).sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        })
      );
    } catch (err) {
      console.error("Error toggling pin:", err);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen py-10 bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded-xl w-1/3 mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[#377eb7] text-center">
          Announcements
        </h2>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-lg">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377eb7] focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#377eb7] bg-white"
            >
              <option value="">All Audiences</option>
              <option value="all">Everyone</option>
              <option value="employees">Employees Only</option>
              <option value="managers">Managers Only</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate("/announcements/add")}
            className="flex items-center gap-2 px-5 py-2 bg-[#377eb7] text-white rounded-xl shadow-md hover:bg-[#2a6a9e] transition-all w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Add Announcement</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement._id}
                className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
                  announcement.isPinned ? "border-yellow-400" : "border-[#377eb7]"
                } hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <h3 className="text-xl font-semibold text-gray-800 truncate">
                        {announcement.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          audienceColors[announcement.audience]
                        }`}
                      >
                        {announcement.audience === "all"
                          ? "Everyone"
                          : announcement.audience.charAt(0).toUpperCase() +
                            announcement.audience.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-3">
                      {announcement.content}
                    </p>
                    <div className="text-sm text-gray-400">
                      <span>
                        By Manager-
                        {new Date(announcement.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleTogglePin(announcement._id)}
                      className={`p-2 rounded-xl transition-colors ${
                        announcement.isPinned
                          ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={announcement.isPinned ? "Unpin" : "Pin"}
                    >
                      <Pin className={`w-5 h-5 ${announcement.isPinned ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => navigate(`/announcements/${announcement._id}`)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/announcements/edit/${announcement._id}`)}
                      className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(announcement._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === announcement._id && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-700 mb-3">
                      Are you sure you want to delete this announcement?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-lg">No announcements found</p>
              <button
                onClick={() => navigate("/announcements/add")}
                className="mt-4 px-6 py-2 bg-[#377eb7] text-white rounded-xl hover:bg-[#2a6a9e] transition"
              >
                Create First Announcement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementList;
