import express from "express";
import { createJD, getJDs } from "../controllers/jdController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createJD);
router.get("/", protect, getJDs);


export default router;