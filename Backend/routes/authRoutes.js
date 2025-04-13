import express from 'express';
import {
  signup,
  signin,
  oauthLogin,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  logout
} from '../controllers/authController.js';

const router = express.Router();

// Register
router.post('/signup', signup);

// Login with email/password
router.post('/signin', signin);

// OAuth login
router.post('/oauth', oauthLogin);

// Forgot password - send reset link
router.post('/forgot-password', forgotPassword);

// Reset password - apply new password using token
router.post('/reset-password', resetPassword);

// Verify email
router.get('/verify-email/:token', verifyEmail);

// Resend verification email
router.post('/resend-verification', resendVerificationEmail);

// Refresh JWT token
router.post('/refresh-token', refreshToken);

// Logout (optional)
router.post('/logout', logout);

export default router;
