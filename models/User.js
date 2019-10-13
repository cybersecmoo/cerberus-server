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
    default: Date.now
  },
  expires: {
    type: Date
  },
  hasChangedPassword: {
    type: Boolean,
    default: false
  },
  isLockedOut: {
    type: Boolean,
    default: false,
    select: false
  },
  token: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
