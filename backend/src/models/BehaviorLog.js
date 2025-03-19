const mongoose = require('mongoose');

const behaviorLogSchema = new mongoose.Schema({
  ipAddress: String,
  headers: Object,
  method: String,
  url: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BehaviorLog', behaviorLogSchema);