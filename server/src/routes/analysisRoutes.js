import express from "express";
import { createAnalysis, getAnalyses, getAnalysisById } from "../controllers/analysisController.js";
import { protect } from "../middleware/auth.js";

import { analyticsLimiter } from "../middleware/rateLimiter.js";


const router = express.Router();

router.post("/", protect,analyticsLimiter, createAnalysis);
router.get('/', protect, getAnalyses);
router.get('/:id', protect, getAnalysisById);

export default router;