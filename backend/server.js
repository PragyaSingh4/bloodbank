const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Route file
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

// Configure env
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(express.json()); // reads JSON data
app.use(cors()); // allows frontend connection

// MongoDB Connection
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

// Call DB connection
connectDatabase();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Blood Bank Server Running");
});

// Port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server is awake and listening on port ${PORT}!`);
});