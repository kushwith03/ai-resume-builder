const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const auth = require('../middleware/auth');

// Health Check
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Resume Routes (Protected)
router.post('/resume/generate', auth, apiController.generateResumeAI);
router.post('/resume/save', auth, apiController.saveResume);
router.get('/resume/list', auth, apiController.getUserResumes);

// Analytics Route (Protected)
router.post('/analytics', auth, apiController.trackAnalytics);

module.exports = router;
