import { Router, Request, Response } from 'express';
import { authService } from '../services/auth.service';

const router = Router();

/**
 * @route POST /api/auth/register/email
 * @desc Register a new user with email and password
 */
router.post('/register/email', async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      firstName,
      middleName,
      phone,
      address,
      district,
      state,
      gstNumber,
      gender,
      age,
    } = req.body;

    if (!email || !password || !firstName || !district || !state || !gender) {
      return res.status(400).json({
        success: false,
        message:
          'Email, password, first name, district, state, and gender are required',
      });
    }

    const result = await authService.registerWithEmail(email, password, {
      firstName,
      middleName,
      phone,
      address,
      district,
      state,
      gstNumber,
      gender,
      age,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @route POST /api/auth/login/email
 * @desc Login with email and password
 */
router.post('/login/email', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await authService.loginWithEmail(email, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @route POST /api/auth/otp/send
 * @desc Send OTP to phone number
 */
router.post('/otp/send', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    const result = await authService.sendOTP(phone);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @route POST /api/auth/otp/verify
 * @desc Verify OTP and login/register user
 */
router.post('/otp/verify', async (req: Request, res: Response) => {
  try {
    const {
      phone,
      otp,
      sessionId,
      firstName,
      middleName,
      email,
      address,
      district,
      state,
      gstNumber,
      gender,
      age,
    } = req.body;

    if (!phone || !otp || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Phone, OTP, and session ID are required',
      });
    }

    // If registering (first time OTP verification), require additional fields
    const userData =
      firstName && district && state && gender
        ? {
            firstName,
            middleName,
            email,
            address,
            district,
            state,
            gstNumber,
            gender,
            age,
          }
        : undefined;

    const result = await authService.verifyOTP(phone, otp, sessionId, userData);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @route GET /api/auth/me
 * @desc Get current user from token
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7);
    const { valid, userId } = authService.verifyToken(token);

    if (!valid || !userId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: { user },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user (client-side token removal)
 */
router.post('/logout', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export default router;
