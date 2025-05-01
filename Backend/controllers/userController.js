import User from "../models/userSchema.js";

// Get profile data (full user data, already attached via middleware)
export const getProfile = async (req, res) => {
  try {
    // 🧾 Full user is already attached via middleware
    res.status(200).json(req.user); // ✅ Return user directly
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error 💥" });
  }
};

// Get user-specific data (excluding password)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.username,
      email: user.email,
      verified: user.isVerified,
      joined: user.createdAt.toDateString(),
      bio: user.bio,
      plan: user.plan || "Free",
      profilePhoto: user.profilePictureUrl || null,
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile photo
export const updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id; // `authenticateUser` middleware attaches the user
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {  profilePictureUrl: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Profile photo updated successfully!",
      profilePhoto: updatedUser.profilePictureUrl,
    });
  } catch (error) {
    console.error("Error updating profile photo:", error);
    res.status(500).json({ message: "Server error." });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

