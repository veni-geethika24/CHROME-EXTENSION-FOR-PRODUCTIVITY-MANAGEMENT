const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  site: String,
  time: Number,
  date: Date
});

module.exports = mongoose.model("Track", trackSchema);
