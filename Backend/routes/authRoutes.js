import express from "express";
import {
  signup,
  signin,
  oauthLogin,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  logout,
  googleCallback, // Google callback for JWT handling
} from "../controllers/authController.js";
import { getProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import passport from "passport";

const router = express.Router();

// Register
router.post("/signup", signup);

// Login with email/password
router.post("/signin", signin);

// OAuth login
router.post("/oauth", oauthLogin);

// Protected route for user profile
router.get("/user/profile", authenticate, getProfile); // Protected by authenticate middleware

// Forgot password - send reset link
router.post("/forgot-password", forgotPassword);

// Reset password - apply new password using token
router.post("/reset-password", resetPassword);

// Verify email
router.get("/verify-email", verifyEmail);

// Resend verification email
router.post("/resend-verification", resendVerificationEmail);

// Refresh JWT token
router.post("/refresh-token", refreshToken);

// Logout
router.post("/logout", logout);

// Get user profile
router.get("/me", authenticate, getProfile);

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signin?error=login_failed",
    session: false,
  }),
  googleCallback
);


export default router;
