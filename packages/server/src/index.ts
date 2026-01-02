import express, { Request, Response } from 'express';
import { PrismaClient } from './../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

import { env } from '@bonchi/shared';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = env.API_PORT;

// Initialize Prisma Client
export const prisma = new PrismaClient({
  accelerateUrl: env.DATABASE_URL,
  log: ['query', 'info', 'warn', 'error'],
}).$extends(withAccelerate());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Auth routes
app.use('/api/auth', authRoutes);

// Start server with async initialization
async function startServer() {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`⚡ Powered by Bun + Express`);
      console.log(`📦 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();
