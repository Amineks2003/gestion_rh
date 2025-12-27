import Announcement from '../models/announcementModel.js';

// Get all announcements with optional filters
export const getAllAnnouncements = async (req, res) => {
  try {
    const { audience, search, isPinned } = req.query;
    
    let filter = {};
    
    // Filter by audience
    if (audience && audience !== 'all') {
      filter.audience = audience;
    }
    
    // Filter by pinned status
    if (isPinned !== undefined) {
      filter.isPinned = isPinned === 'true';
    }
    
    // Search by title or content
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const announcements = await Announcement.find(filter)
      .populate({ path: 'createdBy', select: 'name email' })
      .sort({ isPinned: -1, publishedAt: -1 });
    
    res.json({ success: true, announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single announcement by ID
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate({ path: 'createdBy', select: 'name email' });
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    
    res.json({ success: true, announcement });
  } catch (err) {
    console.error("Error fetching announcement by ID:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, audience, isPinned } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }
    
    const announcement = new Announcement({
      title,
      content,
      audience: audience || 'all',
      isPinned: isPinned || false,
      createdBy: req.user.id,
      publishedAt: new Date()
    });
    
    await announcement.save();
    
    // Populate createdBy before returning
    await announcement.populate({ path: 'createdBy', select: 'name email' });
    
    res.status(201).json({ success: true, announcement });
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an announcement by ID
export const updateAnnouncement = async (req, res) => {
  try {
    const { title, content, audience, isPinned } = req.body;
    
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    
    // Update fields
    if (title !== undefined) announcement.title = title;
    if (content !== undefined) announcement.content = content;
    if (audience !== undefined) announcement.audience = audience;
    if (isPinned !== undefined) announcement.isPinned = isPinned;
    
    await announcement.save();
    
    // Populate createdBy before returning
    await announcement.populate({ path: 'createdBy', select: 'name email' });
    
    res.json({ success: true, announcement });
  } catch (err) {
    console.error("Error updating announcement:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle pin status
export const togglePin = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    
    announcement.isPinned = !announcement.isPinned;
    await announcement.save();
    
    await announcement.populate({ path: 'createdBy', select: 'name email' });
    
    res.json({ success: true, announcement });
  } catch (err) {
    console.error("Error toggling pin status:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete an announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    
    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
