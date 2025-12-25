import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import Performance from "../models/performanceModel.js";
import Presence from "../models/presenceModel.js";
import Announcement from "../models/announcementModel.js";
import Document from "../models/documentModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    
    // ===== BASIC COUNTS =====
    const totalEmployees = await Employee.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();
    const totalDocuments = await Document.countDocuments();
    const totalEvaluations = await Performance.countDocuments();

    // ===== PERFORMANCE AVG =====
    const performanceData = await Performance.aggregate([
      { $match: { overallRating: { $exists: true } } },
      { $group: { _id: null, avgRating: { $avg: "$overallRating" } } },
    ]);

    const averageScore =
      performanceData.length > 0
        ? performanceData[0].avgRating.toFixed(2)
        : 0;

    // ===== RECENT EMPLOYEES =====
    const recentEmployees = await Employee.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // ===== TODAY PRESENCE =====
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPresence = await Presence.countDocuments({
      date: { $gte: today },
      status: "present",
    });

    res.status(200).json({
      success: true,

      cards: {
        totalEmployees,
        totalUsers,
        totalAnnouncements,
        totalDocuments,
        totalEvaluations,
        averageScore,
        todayPresence,
      },

      recentEmployees: recentEmployees.map(e => ({
        id: e._id,
        name: e.user?.name,
        email: e.user?.email,
        department: e.department,
        position: e.position,
        createdAt: e.createdAt,
      })),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Dashboard stats fetch failed",
    });
  }
};
