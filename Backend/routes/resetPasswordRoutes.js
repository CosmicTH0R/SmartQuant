
import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt"; // make sure you import this at the top
import User from "../models/userSchema.js";
import sendResetEmail from "../utils/sendResetPassEmail.js"; // Email sender

const router = express.Router();

// Route to request reset password (send reset link)
router.post("/reset-password", async (req, res) => {
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

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save hashed token and expiry time in the database
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

    // Send reset password email
    try {
      await sendResetEmail(user.email, subject, html);
      console.log("Reset link sent to:", user.email);
    } catch (emailErr) {
      console.error("Error sending reset email:", emailErr);
      return res.status(500).json({ message: "Failed to send reset email. Try again later." });
    }

    return res.status(200).json({ message: "Reset link sent to email." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
});


// Route to reset password (after clicking the reset link)
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Hash the token from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user by hashed token and check token expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token has expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Basic password validation
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // ✅ Hash new password
    const bcrypt = await import("bcrypt"); // If you're using ES Modules
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Save updated password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password successfully reset!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});


export default router;
