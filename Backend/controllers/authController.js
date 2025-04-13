import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
import crypto from "crypto";
// import sendEmail from '../utils/sendEmail.js';
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import userSchema from "../models/userSchema.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Regular Sign Up
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (username, email, password)",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Signup failed", error: err.message });
  }
};


// Regular Sign In
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Sign in successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Signin failed", error: err.message });
  }
};

// OAuth Login
export const oauthLogin = async (req, res) => {
  const { email, profilePicture, oauthProvider, oauthId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        profilePicture,
        oauthProvider,
        oauthId,
        password: null,
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "OAuth login successful",
      user: {
        id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "OAuth login failed", error: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with that email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const html = `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`;

    await sendEmail(user.email, "Reset Your Password", html);
    res.status(200).json({ message: "Password reset link sent" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send reset link", error: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to reset password", error: err.message });
  }
};

// Logout controller (cookies + refresh tokens)

export const logout = async (req, res) => {
  try {
    // 1. Get refresh token from cookie
    const refreshToken = req.cookies?.refreshToken;

    // 2. If no token, just clear cookie and return
    if (!refreshToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", 
      });
      return res.status(200).json({ message: "Logged out successfully" });
      
    }

    // 3. Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout successful 🚀" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error during logout 💥" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Refresh token missing 😿" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token ❌" });
      }

      const accessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" } // Or however long you want
      );

      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return res.status(500).json({ message: "Something went wrong 💥" });
  }
};

// Verify Email
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required 📧" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified ✅" });
    }

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.EMAIL_VERIFICATION_SECRET,
      { expiresIn: "15m" }
    );

    // Send the email
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (err) {
      console.error("Failed to send verification email:", err);
      // Optionally continue or inform user
      return res
        .status(500)
        .json({ message: "Failed to send verification email 📧💥" });
    }

    return res.status(200).json({ message: "Verification email sent ✉️" });
  } catch (err) {
    console.error("Resend email error:", err);
    return res.status(500).json({ message: "Server error 💥" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is missing ❌" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

    // Find the user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found 🕵️" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified ✅" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully 🎉" });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({ message: "Invalid or expired token 💥" });
  }
};
