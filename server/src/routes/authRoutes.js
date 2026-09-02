import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

import passport from "../config/passport.js";
import generateToken, { setTokenCookie } from "../utils/generateToken.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", validate(registerSchema), register);

// @route   POST /api/auth/login
router.post("/login", validate(loginSchema), login);


// @route   POST /api/auth/logout
router.post("/logout", logout);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);


// GET /api/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);




// GET /api/auth/google/callback with error handling
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      console.error("Google OAuth callback error:", err?.message || "No user returned");
      return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
    // Successful authentication, generate token and redirect
    const token = generateToken(user._id);
    setTokenCookie(res, token);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  })(req, res, next);
});

export default router;