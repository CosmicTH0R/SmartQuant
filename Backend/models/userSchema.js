// import mongoose from 'mongoose';
// import crypto from 'crypto';

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: function () {
//         return !this.oauthProvider;
//       },
//     },
//     oauthProvider: {
//       type: String, // 'google', 'facebook', 'apple'
//     },
//     oauthId: {
//       type: String, // ID returned by provider
//     },
//     profilePicture: {
//       type: String, // optional profile pic URL
//     },
//     resetPasswordToken: {
//       type: String,
//     },
//     resetPasswordExpires: {
//       type: Date,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     emailVerificationToken: {
//       type: String,
//     },
//     refreshToken: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// // Method to generate reset token
// userSchema.methods.generateResetToken = function () {
//   const token = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordToken = token;
//   this.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//   return token;
// };

// export default mongoose.model('User', userSchema);




import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
      type: String, // 'google', 'facebook', etc.
    },
    oauthId: {
      type: String,
    },
    profilePicture: {
      type: String,
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

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
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
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000;
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

export default mongoose.model('User', userSchema);
