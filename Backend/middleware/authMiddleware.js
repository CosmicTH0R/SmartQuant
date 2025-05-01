import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "🔒 Unauthorized: No token found" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // ✅ Verify token
      console.log("✅ JWT decoded:", decoded);
    } catch (err) {
      // Handle token expiration or invalidity
      return res.status(401).json({ message: "❌ Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("-password"); // 🔍 Fetch user

    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    req.user = user; // 📦 Attach user to request
    next(); // 🛫 Move to next middleware
  } catch (err) {
    console.error("🚨 JWT Authentication Error:", err);
    return res.status(500).json({ message: "❌ Server error during authentication" });
  }
};

