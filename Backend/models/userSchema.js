import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "Hey there! I am using this app.",
      trim: true,
      maxlength: 160,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthProvider;
      },
      minlength: 6,
    },
    oauthProvider: {
      type: String, // e.g., 'google', 'facebook'
    },
    oauthId: {
      type: String,
    },
    profilePictureUrl: {
      type: String,
    },
    plan: {
      type: String, // e.g., 'Free', 'Pro'
      enum: ["Free Member", "Pro Member"],  // Add more plans as needed
      default: "Free Member",  // Default plan
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("avatar").get(function () {
  return (
    this.profilePictureUrl ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${this.username || "user"}`
  );
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Generate reset password token
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
};

// Hide sensitive fields when sending user data
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  delete obj.emailVerificationToken;
  return obj;
};

export default mongoose.model("User", userSchema);
