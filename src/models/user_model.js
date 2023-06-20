const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nameUser: {
    type: String,
    require: true,
    maxlength: 255,
  },
  numberUser: {
    type: String,
    require: true,
    maxlength: 255,
  },
  emailUser: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  messageUser: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
