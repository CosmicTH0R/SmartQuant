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
  googleCallback, // Import your googleCallback function here
} from "../controllers/authController.js";
import { getProfile } from "../controllers/userController.js"; // Make a user controller
import { authenticate } from "../middleware/authMiddleware.js"; // Import the authenticate middleware

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

// Logout (optional)
router.post("/logout",authenticate, logout);

// Get user profile
router.get("/me", authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});


// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect on failure
    session: false, // We don't use sessions here
  }),
  googleCallback // Use your googleCallback function
);

// redirect to Facebook
// router.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// // callback from Facebook
// router.get('/api/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/signin' }),
//   (req, res) => {
//     // Send token or redirect
//     const token = generateJWT(req.user); // your JWT logic
//     res.redirect(`http://localhost:3000/dashboard?token=${token}`);
//   }
// );


export default router;
