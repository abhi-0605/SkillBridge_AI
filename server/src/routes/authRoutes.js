import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", validate(registerSchema), register);

// @route   POST /api/auth/login
router.post("/login", validate(loginSchema), login);


// @route   POST /api/auth/logout
router.post("/logout", logout);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);

export default router;