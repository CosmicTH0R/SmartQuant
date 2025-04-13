import express from 'express';
import crypto from 'crypto';
import User from '../models/userSchema.js';
import sendResetEmail from '../utils/sendResetPassEmail.js'; // Email sender

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).json({ message: "User not found with this email" });
    }

    // Generate and hash reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log("Generated reset link:", resetLink);

    const subject = "Reset Your Password";
    const html = `
      <p>Hello,</p>
      <p>You requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <br />
      <p>If the button doesn't work, copy and paste this URL into your browser:</p>
      <p>${resetLink}</p>
    `;

    try {
      // await sendResetEmail(user.email, resetLink);
      await sendResetEmail(user.email, subject, html);
      console.log("Reset link sent to:", user.email);
    } catch (emailErr) {
      console.error("Error sending reset email:", emailErr);
      return res.status(500).json({ message: "Failed to send reset email. Try again later." });
    }

    return res.status(200).json({ message: 'Reset link sent to email.' });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

export default router;
