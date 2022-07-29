const mongoose = require("mongoose");

const User = mongoose.model("Schedule", {
  date: Date,
  email: String,
  password: String,
});

module.exports = User;
