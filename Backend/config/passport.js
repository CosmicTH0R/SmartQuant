import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id: googleId, displayName, emails, photos } = profile;

      try {
        const email = emails?.[0]?.value;
        const avatar = photos?.[0]?.value;

        if (!email) {
          return done(new Error("Email not provided by Google"), null);
        }

        // Check if user already exists with this email
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but doesn't have googleId, update it
          if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
          }

          return done(null, user);
        }

        // Create new user if not found
        const newUser = new User({
          googleId,
          username: displayName,
          email,
          avatar,
          password: bcrypt.hashSync('google-auth-default', 10), // Not used, just placeholder
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);
