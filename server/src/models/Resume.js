const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { 
    type: String, // Keeping it simple as String for mock, could be ObjectId ref to User
    required: true 
  },
  data: { 
    type: Object, 
    required: true 
  },
  atsScore: {
    type: Number,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
