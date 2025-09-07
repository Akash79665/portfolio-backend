const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET contact info
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
