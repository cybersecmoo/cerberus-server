const mongoose = require("mongoose");

const TargetSchema = new mongoose.Schema({
  targetID: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  uptime: {
    type: Number,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  runningAs: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  workingDir: {
    type: String,
    required: true
  }
});

// Target allows us to keep track of which hosts have been infected

module.exports = Target = mongoose.model("target", TargetSchema);
