// import express from "express";
// import {
//   signup,
//   signin,
//   oauthLogin,
//   forgotPassword,
//   resetPassword,
//   verifyEmail,
//   resendVerificationEmail,
//   refreshToken,
//   logout,
// } from "../controllers/authController.js";

// import passport from 'passport';
// import { googleCallback } from '../controllers/authController.js';

// const router = express.Router();

// // Register
// router.post("/signup", signup);

// // Login with email/password
// router.post("/signin", signin);

// // OAuth login
// router.post("/oauth", oauthLogin);

// // Forgot password - send reset link
// router.post("/forgot-password", forgotPassword);

// // Reset password - apply new password using token
// router.post("/reset-password", resetPassword);

// // Verify email
// router.get("/verify-email", verifyEmail);

// // Resend verification email
// router.post("/resend-verification", resendVerificationEmail);

// // Refresh JWT token
// router.post("/refresh-token", refreshToken);

// // Logout (optional)
// router.post("/logout", logout);

// // Google login start
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Callback route
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   googleCallback
// );

// export default router;

// import express from "express";
// import {
//   signup,
//   signin,
//   oauthLogin,
//   forgotPassword,
//   resetPassword,
//   verifyEmail,
//   resendVerificationEmail,
//   refreshToken,
//   logout,
//   googleCallback, // Import your googleCallback function here
// } from "../controllers/authController.js";
// import { getProfile } from "../controllers/userController.js"; // Make a user controller

// import passport from "passport";

// const router = express.Router();

// // Register
// router.post("/signup", signup);

// // Login with email/password
// router.post("/signin", signin);

// // OAuth login
// router.post("/oauth", oauthLogin);

// router.get("/user/profile", getProfile);
// // Forgot password - send reset link
// router.post("/forgot-password", forgotPassword);

// // Reset password - apply new password using token
// router.post("/reset-password", resetPassword);

// // Verify email
// router.get("/verify-email", verifyEmail);

// // Resend verification email
// router.post("/resend-verification", resendVerificationEmail);

// // Refresh JWT token
// router.post("/refresh-token", refreshToken);

// // Logout (optional)
// router.post("/logout", logout);

// // Google login start
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Callback route
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login", // Redirect on failure
//     session: false, // We don't use sessions here
//   }),
//   googleCallback // Use your googleCallback function
// );

// export default router;





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
router.post("/logout", logout);

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

export default router;
