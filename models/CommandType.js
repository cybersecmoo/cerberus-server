const mongoose = require("mongoose");

const CommandTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  argsCount: {
    type: Number,
    required: true
  }
});

module.exports = CommandType = mongoose.model("commandtype", CommandTypeSchema);
