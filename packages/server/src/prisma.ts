import { PrismaClient } from './../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
  log: ['query', 'info', 'warn', 'error'],
}).$extends(withAccelerate());

export default prisma;
