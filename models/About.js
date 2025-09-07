const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  resumeUrl: String,
  profileImage: String,
});

module.exports = mongoose.model("About", aboutSchema);
