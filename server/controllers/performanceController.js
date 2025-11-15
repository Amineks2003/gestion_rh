import Performance from "../config/models/performanceModel.js";

// 📍 CREATE performance
export const createPerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body);
    res.status(201).json({ message: "Performance created", performance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📍 GET all performances
export const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find()
      .populate("employee")
      .populate("evaluatedBy");

    res.status(200).json(performances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📍 GET performance by ID
export const getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
      .populate("employee")
      .populate("evaluatedBy");

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📍 UPDATE performance
export const updatePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json({ message: "Performance updated successfully", performance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📍 DELETE performance
export const deletePerformance = async (req, res) => {
  try {
    const performance = await Performance.findByIdAndDelete(req.params.id);

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.status(200).json({ message: "Performance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
