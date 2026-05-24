const Resume = require('../models/Resume');
const Analytics = require('../models/Analytics');
const aiService = require('../services/aiService');

exports.generateResumeAI = async (req, res) => {
  const { userDescription } = req.body;
  
  if (!userDescription) {
    return res.status(400).json({ error: "User description is required" });
  }

  try {
    const generatedData = await aiService.generateResumeData(userDescription);
    res.status(200).json({ data: generatedData });
  } catch (error) {
    console.error("AI Generation Controller Error:", error.message);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Failed to generate resume via AI" });
  }
};

exports.saveResume = async (req, res) => {
  try {
    const { data, atsScore } = req.body;
    const userId = req.user.id;

    const newResume = await Resume.create({
      userId,
      data,
      atsScore
    });

    res.status(201).json({ message: "Resume saved successfully", resume: newResume });
  } catch (error) {
    res.status(500).json({ error: "Failed to save resume" });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ resumes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

exports.trackAnalytics = async (req, res) => {
  try {
    const { action, metadata } = req.body;
    const userId = req.user.id;
    
    await Analytics.create({
      userId,
      action,
      metadata
    });

    res.status(200).json({ message: "Analytics tracked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to track analytics" });
  }
};
