import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized 🔒" });
  }

  const token = authHeader.split(" ")[1];
  console.log("token mila? --->", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    req.user = user; // ⬅️ Set user directly
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(403).json({ message: "Invalid token ❌" });
  }
};