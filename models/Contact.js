const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  location: String,
});

module.exports = mongoose.model("Contact", contactSchema);
