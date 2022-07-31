const mongoose = require("mongoose");

const Schedule = mongoose.model("Schedule", {
  date: Date,
  userName: String,
  userId: mongoose.Schema.Types.ObjectId,
  service: String,
});

module.exports = Schedule;
