import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import corsOptions from "./config/corsOptions.js";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js"; 

// Loads environment variables from a .env file into process.env
dotenv.config();

// Initializes your Express app instance
const app = express();  

// Sets the port the server will listen on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser()); // Parse cookies from incoming requests
// both are about parsing and converting raw incoming data into clean, usable JavaScript objects, so routes and middleware can easily access it.

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes); 

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.log("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
