const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  name: String,
  ip: String
});

const linkSchema = new mongoose.Schema({
  origin: String,
  dest: String
});

const NetworkMapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ipRange: {
    type: String,
    required: true
  },
  nodes: [nodeSchema],
  links: [linkSchema]
});

module.exports = NetworkMap = mongoose.model("networkmap", NetworkMapSchema);
