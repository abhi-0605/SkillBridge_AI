import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // resumes as text can be long
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Health check route (sanity test)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "SkillBridge_AI API is running" });
});

// Routes will be mounted here 
app.use("/api/auth", authRoutes);

// app.use("/api/resume", resumeRoutes);
// app.use("/api/jd", jdRoutes);
// app.use("/api/analysis", analysisRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;