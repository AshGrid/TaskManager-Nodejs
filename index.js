import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path, { join } from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import helmet from "helmet";

// Import routes
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import taskRoute from "./routes/taskRoute.js";
import authRoute from "./routes/authRoute.js";

// Database connection
import dbConnect from "./dbConnect.js";
import {connection} from "mongoose";

dotenv.config();
const app = express();

// Connect to the database
dbConnect();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(join(__dirname, "uploads")));

// API routes
app.use("/api/users", userRoute);
app.use("/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/tasks", taskRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "An unexpected error occurred",
        error: process.env.NODE_ENV === "development" ? err.message : null,
    });
});

// Handle unhandled routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        console.log("Closing server...");
        await connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Error during server shutdown:", err);
        process.exit(1);
    }
});
