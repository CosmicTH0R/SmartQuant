export const getProfile = async (req, res) => {
  try {
    // 🧾 Full user is already attached via middleware
    res.status(200).json(req.user); // ✅ Return user directly
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error 💥" });
  }
};
