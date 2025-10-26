import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import Web3 from 'web3';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

// Import configurations
import { connectDB } from './config/database';
import { redisConfig } from './config/redis';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';
import { rateLimitMiddleware } from './middleware/rateLimit.middleware';

// Import routes
import userRoutes from './routes/users';
import slotRoutes from './routes/slots';
import dividendRoutes from './routes/dividends';
import royaltyRoutes from './routes/royalty';
import lotteryRoutes from './routes/lottery';
import adminRoutes from './routes/admin';
import transactionRoutes from './routes/transactions';

// Import types
import { AuthRequest } from './types/express';

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Initialize Web3
const web3 = new Web3(process.env.BSC_NODE_URL || 'https://bsc-dataseed.binance.org/');

// Initialize Redis
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(loggerMiddleware);
app.use(rateLimitMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/dividends', dividendRoutes);
app.use('/api/royalty', royaltyRoutes);
app.use('/api/lottery', lotteryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Future Pro Space API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_user', (userId: string) => {
    socket.join(`user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Future Pro Space Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

export { app, io, redis, web3 };