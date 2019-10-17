const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now,
    select: false
  },
  hasChangedPassword: {
    type: Boolean,
    default: false,
    select: false
  },
  isLockedOut: {
    type: Boolean,
    default: false,
    select: false
  },
  token: {
    type: String,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
