import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import passport from 'passport';


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cookieParser());
app.use(morgan('dev')); // Logging middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate-limiting to avoid brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
app.use(limiter);
app.use(passport.initialize());

// Routes
import authRoutes from './routes/authRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import stockDetailRoutes from './routes/stockDetailRoutes.js';
import resetPasswordRoutes from './routes/resetPasswordRoutes.js'; // Reset password route
import './config/passport.js'; // Passport configuration

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/stocks-details', stockDetailRoutes);
app.use('/api', resetPasswordRoutes); // Reset password route


// Test Route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running successfully' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
