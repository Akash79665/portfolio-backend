// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// // Import routes
// const projectRoutes = require("./routes/projectRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const aboutRoutes = require("./routes/aboutRoutes");
// const skillsRoutes = require("./routes/skillsRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use("/api/projects", projectRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/about", aboutRoutes);
// app.use("/api/skills", skillsRoutes);
// app.use("/api/contact", contactRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Portfolio API running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//For Atlas Online database


// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection (clean version)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🌍 Portfolio API running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
