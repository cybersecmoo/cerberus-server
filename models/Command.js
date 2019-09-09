const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  args: {
    type: Array,
    required: true,
    default: []
  },
  targetID: {
    type: String,
    required: true
  },
  hasBeenRun: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = Command = mongoose.model("command", CommandSchema);
