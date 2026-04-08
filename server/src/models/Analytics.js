const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  action: { 
    type: String, 
    required: true 
  },
  metadata: { 
    type: Object,
    default: {} 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
