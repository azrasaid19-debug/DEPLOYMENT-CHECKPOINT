const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load environment variables
require("dotenv").config();

// Import User model
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==============================
// CONNECT TO MONGODB
// ==============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ==============================
// API ROUTES
// ==============================

// Test route
app.get("/api/test", (req, res) => {
  res.send("API is working ✅");
});

// GET all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST new user
app.post("/api/users", async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.json(savedUser);
});

// ==============================
// THIS PART IS IMPORTANT FOR AZURE
// It will serve React later
// ==============================
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
