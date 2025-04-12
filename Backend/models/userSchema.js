import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
