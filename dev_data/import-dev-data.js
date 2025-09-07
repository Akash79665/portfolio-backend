// // dev-data/import-dev-data.js
// const fs = require("fs");
// const mongoose = require("mongoose");
// require("dotenv").config({ path: "../.env" }); // adjust path if needed

// // Models
// const Project = require("../models/Project");
// const About = require("../models/About");
// const Skill = require("../models/Skill");
// const Contact = require("../models/Contact");

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Read JSON files
// const projects = JSON.parse(fs.readFileSync(`${__dirname}/projects.json`, "utf-8"));
// const about = JSON.parse(fs.readFileSync(`${__dirname}/about.json`, "utf-8"));
// const skills = JSON.parse(fs.readFileSync(`${__dirname}/skills.json`, "utf-8"));
// const contact = JSON.parse(fs.readFileSync(`${__dirname}/contact.json`, "utf-8"));

// // Import data
// const importData = async () => {
//   try {
//     await Project.deleteMany();
//     await About.deleteMany();
//     await Skill.deleteMany();
//     await Contact.deleteMany();

//     await Project.create(projects);
//     await About.create(about);
//     await Skill.create(skills);
//     await Contact.create(contact);

//     console.log("✅ Data successfully imported!");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error importing data:", err);
//     process.exit(1);
//   }
// };

// // Delete data
// const deleteData = async () => {
//   try {
//     await Project.deleteMany();
//     await About.deleteMany();
//     await Skill.deleteMany();
//     await Contact.deleteMany();

//     console.log("✅ Data successfully deleted!");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error deleting data:", err);
//     process.exit(1);
//   }
// };

// // Command line argument
// if (process.argv[2] === "--import") {
//   importData();
// } else if (process.argv[2] === "--delete") {
//   deleteData();
// } else {
//   console.log("❌ Use --import to import data or --delete to delete data");
//   process.exit();
// }

//node dev_data/import-dev-data.js --import
//node dev_data/import-dev-data.js --delete

// import-dev-data.js
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" }); // load env

// Models
const Project = require("../models/Project");
const About = require("../models/About");
const Skill = require("../models/Skill");
const Contact = require("../models/Contact");

// --------------------------------------------
// 🔌 Connect to MongoDB Atlas
// --------------------------------------------
const DB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

mongoose
  .connect(DB)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --------------------------------------------
// 📦 Load JSON data (auto-wrap single objects into array)
// --------------------------------------------
const loadData = (filePath) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return Array.isArray(data) ? data : [data]; // wrap single object into array
};

const projects = loadData(`${__dirname}/projects.json`);
const about = loadData(`${__dirname}/about.json`);
const skills = loadData(`${__dirname}/skills.json`);
const contacts = loadData(`${__dirname}/contact.json`);

// --------------------------------------------
// 📥 Import data handlers
// --------------------------------------------
const importHandlers = {
  projects: async () => { await Project.insertMany(projects); console.log("✅ Projects imported!"); },
  about: async () => { await About.insertMany(about); console.log("✅ About imported!"); },
  skills: async () => { await Skill.insertMany(skills); console.log("✅ Skills imported!"); },
  contacts: async () => { await Contact.insertMany(contacts); console.log("✅ Contacts imported!"); },
};

// --------------------------------------------
// 🗑️ Delete data handlers
// --------------------------------------------
const deleteHandlers = {
  projects: async () => { await Project.deleteMany(); console.log("🗑️ Projects deleted!"); },
  about: async () => { await About.deleteMany(); console.log("🗑️ About deleted!"); },
  skills: async () => { await Skill.deleteMany(); console.log("🗑️ Skills deleted!"); },
  contacts: async () => { await Contact.deleteMany(); console.log("🗑️ Contacts deleted!"); },
};

// --------------------------------------------
// 🚀 CLI runner
// --------------------------------------------
const [,, arg] = process.argv;

const run = async () => {
  try {
    if (arg?.startsWith("--import=")) {
      const type = arg.split("=")[1];
      if (importHandlers[type]) await importHandlers[type]();
      else throw new Error("Unknown import type");
    } else if (arg?.startsWith("--delete=")) {
      const type = arg.split("=")[1];
      if (deleteHandlers[type]) await deleteHandlers[type]();
      else throw new Error("Unknown delete type");
    } else {
      throw new Error("Please use --import=<type> or --delete=<type>");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

run();

// --------------------------------------------
// ✅ CLI Usage Examples
// --------------------------------------------
// Import collections
// node import-dev-data.js --import=projects
// node import-dev-data.js --import=about
// node import-dev-data.js --import=skills
// node import-dev-data.js --import=contacts

// Delete collections
// node import-dev-data.js --delete=projects
// node import-dev-data.js --delete=about
// node import-dev-data.js --delete=skills
// node import-dev-data.js --delete=contacts
