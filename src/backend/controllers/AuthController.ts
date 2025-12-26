import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/AuthService';
import { AuthValidator } from '../validators/AuthValidator';
import { ResponseUtil } from '../utils/ResponseUtil';
import { AppError } from '../errors/AppError';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      const validatedData = AuthValidator.validateRegister(body);
      
      const result = await this.authService.register(validatedData);

      const response = ResponseUtil.success(result, 'Registration successful', 201);
      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Registration failed', 500);
    }
  }

  async login(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      const validatedData = AuthValidator.validateLogin(body);
      
      const result = await this.authService.login(validatedData);

      const response = ResponseUtil.success(result, 'Login successful');

      response.cookies.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Login failed', 500);
    }
  }

  async logout(request: NextRequest): Promise<NextResponse> {
    const response = ResponseUtil.success(null, 'Logout successful');
    
    // Clear cookie
    response.cookies.delete('token');

    return response;
  }

  async getCurrentUser(request: NextRequest): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const user = await this.authService.getCurrentUser(payload.userId);

      return ResponseUtil.success(user);
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to get user', 500);
    }
  }
}