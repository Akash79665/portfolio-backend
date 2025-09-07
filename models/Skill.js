const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }, // Use number 0-100
  icon: { type: String }, // optional URL or local icon path
  info: { type: String },
});

module.exports = mongoose.model("Skill", skillSchema);
