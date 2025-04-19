import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id }, // or any payload you want
    process.env.JWT_SECRET, // 👈 This is the problem
    { expiresIn: "1d" }
  );
};
