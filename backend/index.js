import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();

// Set default port if not specified in environment variables
const port = process.env.PORT || 5000;

// Using middlewares
app.use(express.json());
app.use(cookieParser());

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

// Serve static files from the frontend dist folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Serve the main index.html file for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDb(); // Ensure DB connection before starting the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

startServer();
