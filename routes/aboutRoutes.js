const express = require("express");
const router = express.Router();
const About = require("../models/About");

// GET about info
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
