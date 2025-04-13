import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthProvider;
      },
    },
    oauthProvider: {
      type: String, // 'google', 'facebook', 'apple'
    },
    oauthId: {
      type: String, // ID returned by provider
    },
    profilePicture: {
      type: String, // optional profile pic URL
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Method to generate reset token
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  return token;
};

export default mongoose.model('User', userSchema);
