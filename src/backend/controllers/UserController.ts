import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../services/userService';
import { UserValidator } from '../validators/UserValidator';
import { ResponseUtil } from '../utils/ResponseUtil';
import { AppError } from '../errors/AppError';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(request: NextRequest): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const user = await this.userService.getProfile(payload.userId);

      return ResponseUtil.success(user);
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to get profile', 500);
    }
  }

  async updateProfile(request: NextRequest): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const body = await request.json();
      const validatedData = UserValidator.validateUpdateProfile(body);

      const user = await this.userService.updateProfile(
        payload.userId,
        validatedData
      );

      return ResponseUtil.success(user, 'Profile updated successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to update profile', 500);
    }
  }
}