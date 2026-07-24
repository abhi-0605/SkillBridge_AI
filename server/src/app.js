import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jdRoutes from "./routes/jdRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";

const app = express();

app.set("trust proxy", 1);

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

// Core middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (Postman, curl, mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "SkillBridge_AI API is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jd", jdRoutes);
app.use("/api/analysis", analysisRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;














// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "./config/passport.js";

// import authRoutes from "./routes/authRoutes.js";
// import resumeRoutes from "./routes/resumeRoutes.js";
// import jdRoutes from "./routes/jdRoutes.js";
// import analysisRoutes from "./routes/analysisRoutes.js";

// const app = express();

// app.set("trust proxy", 1);

// // Core middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "10mb" })); // resumes as text can be long
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Health check route (sanity test)
// app.get("/api/health", (req, res) => {
//   res.status(200).json({ status: "ok", message: "SkillBridge_AI API is running" });
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/resume", resumeRoutes);
// app.use("/api/jd", jdRoutes);
// app.use("/api/analysis", analysisRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// export default app;