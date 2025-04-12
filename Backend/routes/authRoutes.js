import express from 'express';
import {
  signup,
  signin,
  oauthLogin,
  forgotPassword,
  resetPassword,
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
export default router;
