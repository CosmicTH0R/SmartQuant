import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error 💥" });
  }
};