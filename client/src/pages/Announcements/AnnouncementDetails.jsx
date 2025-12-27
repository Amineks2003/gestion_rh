import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAnnouncementById, deleteAnnouncement, toggleAnnouncementPin } from "../../api/announcementApi.js";
import { Pin, Users, Calendar, User, ArrowLeft, Edit, Trash2 } from "lucide-react";

const audienceColors = {
  all: "bg-blue-100 text-blue-800",
  employees: "bg-green-100 text-green-800",
  managers: "bg-purple-100 text-purple-800",
};

const AnnouncementDetails = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const res = await fetchAnnouncementById(id);
        setAnnouncement(res.data.announcement);
      } catch (err) {
        console.error("Error loading announcement:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncement();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAnnouncement(id);
      navigate("/announcements");
    } catch (err) {
      console.error("Error deleting announcement:", err);
      setDeleting(false);
    }
  };

  const handleTogglePin = async () => {
    try {
      const res = await toggleAnnouncementPin(id);
      setAnnouncement((prev) => ({
        ...prev,
        isPinned: res.data.announcement.isPinned,
      }));
    } catch (err) {
      console.error("Error toggling pin:", err);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen py-10 bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="h-10 bg-gray-200 rounded-xl w-2/3"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
                <div className="h-10 bg-gray-200 rounded-xl flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen py-10 bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Announcement not found</p>
          <button
            onClick={() => navigate("/announcements")}
            className="px-6 py-2 bg-[#377eb7] text-white rounded-xl hover:bg-[#2a6a9e] transition"
          >
            Back to Announcements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-[#f6f7f0] to-[#e8f4f8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/announcements")}
          className="flex items-center gap-2 text-[#377eb7] hover:text-[#2a6a9e] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Announcements</span>
        </button>

        {/* Main Card */}
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${
          announcement.isPinned ? "border-yellow-400" : "border-[#377eb7]"
        }`}>
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#f6f7f0] to-[#e8f4f8] border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  {announcement.isPinned && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      <Pin className="w-4 h-4 fill-yellow-500" />
                      Pinned
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      audienceColors[announcement.audience]
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-1" />
                    {announcement.audience === "all"
                      ? "Everyone"
                      : announcement.audience.charAt(0).toUpperCase() +
                        announcement.audience.slice(1)}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {announcement.title}
                </h1>
              </div>

              {/* Pin Toggle Button */}
              <button
                onClick={handleTogglePin}
                className={`p-3 rounded-xl transition-colors ${
                  announcement.isPinned
                    ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={announcement.isPinned ? "Unpin" : "Pin"}
              >
                <Pin className={`w-6 h-6 ${announcement.isPinned ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {announcement.content}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-[#377eb7]" />
                <span className="font-medium">Created by:</span>
                <span>Manager</span>
              </div>
              <div className="hidden sm:block w-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-[#377eb7]" />
                <span className="font-medium">Published:</span>
                <span>
                  {new Date(announcement.publishedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(`/announcements/edit/${id}`)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Announcement</span>
              </button>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Announcement</span>
              </button>
            </div>

            {/* Delete Confirmation */}
            {deleteConfirm && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-700 mb-3 font-medium">
                  Are you sure you want to delete this announcement? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deleting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Deleting...
                      </span>
                    ) : (
                      "Yes, Delete"
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetails;
