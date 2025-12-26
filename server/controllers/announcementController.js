import Announcement from "../models/announcementModel.js";
import User from "../models/userModel.js";

// Create announcement (HR / Manager)
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      audience: req.body.audience,
      isPinned: req.body.isPinned,
      createdBy: req.userId, // comes from auth middleware
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get announcements (employees)
export const getAnnouncements = async (req, res) => {
  try {
    // Get user role
    const user = await User.findById(req.userId);
    const userRole = user?.role || "employees";

    const announcements = await Announcement.find({
      $or: [
        { audience: "all" },
        { audience: userRole }, // employees / managers
      ],
    })
      .populate("createdBy", "name email")
      .sort({ isPinned: -1, publishedAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all announcements (public - no auth required)
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({})
      .populate("createdBy", "name email")
      .sort({ isPinned: -1, publishedAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create announcement (public - no auth required)
export const createAnnouncementPublic = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      audience: req.body.audience || "all",
      isPinned: req.body.isPinned || false,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
