import { PrismaClient, AuthType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import smsService from './sms.service.js';
import { env } from '@bonchi/shared';
import { prisma } from '../index.js';

const JWT_SECRET = env.JWT_SECRET;
const OTP_EXPIRY_MINUTES = 10;

interface AuthResult {
  success: boolean;
  message: string;
  data?: {
    user?: any;
    token?: string;
    sessionId?: number;
  };
  error?: string;
}

export class AuthService {
  /**
   * Register a new user with email and password
   */
  async registerWithEmail(
    email: string,
    password: string,
    userData: {
      firstName: string;
      middleName?: string;
      phone?: string;
      address?: string;
      district: string;
      state: string;
      gstNumber?: string;
      gender: string;
      age?: number;
    }
  ): Promise<AuthResult> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists',
        };
      }

      // Check if phone already exists (if provided)
      if (userData.phone) {
        const existingPhone = await prisma.user.findUnique({
          where: { phone: userData.phone },
        });
        if (existingPhone) {
          return {
            success: false,
            message: 'User with this phone number already exists',
          };
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create full name
      const fullName = userData.middleName
        ? `${userData.firstName} ${userData.middleName}`
        : userData.firstName;

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: userData.firstName,
          middleName: userData.middleName,
          name: fullName,
          phone: userData.phone,
          address: userData.address,
          district: userData.district,
          state: userData.state,
          gstNumber: userData.gstNumber,
          gender: userData.gender as any,
          age: userData.age,
          authType: AuthType.EMAIL_PASSWORD,
          isVerified: false,
        },
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      return {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            authType: user.authType,
            isVerified: user.isVerified,
          },
          token,
        },
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        message: 'Failed to register user',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Login with email and password
   */
  async loginWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || user.authType !== AuthType.EMAIL_PASSWORD) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Verify password
      if (!user.password) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            authType: user.authType,
            isVerified: user.isVerified,
          },
          token,
        },
      };
    } catch (error) {
      console.error('Error logging in:', error);
      return {
        success: false,
        message: 'Failed to login',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send OTP to phone number
   */
  async sendOTP(phone: string): Promise<AuthResult> {
    try {
      // Validate phone number
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return {
          success: false,
          message: 'Invalid phone number',
        };
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Hash OTP before storing
      const hashedOtp = await bcrypt.hash(otp, 10);

      // Calculate expiry time
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

      // Delete any existing unverified OTP sessions for this phone
      await prisma.otpSession.deleteMany({
        where: {
          phone,
          verified: false,
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      // Create OTP session
      const otpSession = await prisma.otpSession.create({
        data: {
          phone,
          otp: hashedOtp,
          expiresAt,
          verified: false,
          attempts: 0,
        },
      });

      // Send OTP via SMS (using Quick SMS for simplicity)
      try {
        await smsService.sendQuickSMS({
          numbers: phone,
          message: `Your Bonchi OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes. Do not share this code.`,
        });
      } catch (smsError) {
        console.error('Error sending SMS:', smsError);
        // Continue even if SMS fails (for development)
        console.log('OTP (dev only):', otp);
      }

      return {
        success: true,
        message: 'OTP sent successfully',
        data: {
          sessionId: otpSession.id,
        },
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        message: 'Failed to send OTP',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Verify OTP and login/register user
   */
  async verifyOTP(
    phone: string,
    otp: string,
    sessionId: number,
    userData?: {
      firstName: string;
      middleName?: string;
      email?: string;
      address?: string;
      district: string;
      state: string;
      gstNumber?: string;
      gender: string;
      age?: number;
    }
  ): Promise<AuthResult> {
    try {
      // Find OTP session
      const otpSession = await prisma.otpSession.findUnique({
        where: { id: sessionId },
      });

      if (!otpSession || otpSession.phone !== phone) {
        return {
          success: false,
          message: 'Invalid OTP session',
        };
      }

      // Check if expired
      if (otpSession.expiresAt < new Date()) {
        return {
          success: false,
          message: 'OTP has expired',
        };
      }

      // Check if already verified
      if (otpSession.verified) {
        return {
          success: false,
          message: 'OTP already used',
        };
      }

      // Check attempts
      if (otpSession.attempts >= 3) {
        return {
          success: false,
          message: 'Too many attempts. Please request a new OTP',
        };
      }

      // Verify OTP
      const isOtpValid = await bcrypt.compare(otp, otpSession.otp);

      if (!isOtpValid) {
        // Increment attempts
        await prisma.otpSession.update({
          where: { id: sessionId },
          data: { attempts: otpSession.attempts + 1 },
        });

        return {
          success: false,
          message: 'Invalid OTP',
        };
      }

      // Mark OTP as verified
      await prisma.otpSession.update({
        where: { id: sessionId },
        data: { verified: true },
      });

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { phone },
      });

      if (!user && userData) {
        // Create full name
        const fullName = userData.middleName
          ? `${userData.firstName} ${userData.middleName}`
          : userData.firstName;

        // Register new user
        user = await prisma.user.create({
          data: {
            phone,
            firstName: userData.firstName,
            middleName: userData.middleName,
            name: fullName,
            email: userData.email,
            address: userData.address,
            district: userData.district,
            state: userData.state,
            gstNumber: userData.gstNumber,
            gender: userData.gender as any,
            age: userData.age,
            authType: AuthType.SMS_OTP,
            isVerified: true,
          },
        });
      } else if (user) {
        // Update verification status
        user = await prisma.user.update({
          where: { id: user.id },
          data: { isVerified: true },
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, phone: user.phone },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      return {
        success: true,
        message: 'OTP verified successfully',
        data: {
          user: {
            id: user.id,
            phone: user.phone,
            name: user.name,
            authType: user.authType,
            isVerified: user.isVerified,
          },
          token,
        },
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'Failed to verify OTP',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): { valid: boolean; userId?: number } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      return { valid: true, userId: decoded.userId };
    } catch (error) {
      return { valid: false };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          phone: true,
          name: true,
          authType: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
