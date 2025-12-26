import { NextRequest } from 'next/server';
import { UserController } from '@/backend/controllers/UserController';
import { RateLimiter } from '@/backend/middlewares/RateLimiter';
import { ResponseUtil } from '@/backend/utils/ResponseUtil';
import { AppError } from '@/backend/errors/AppError';

const userController = new UserController();

export async function GET(request: NextRequest) {
  try {
    RateLimiter.check(request);
    
    const response = await userController.getProfile(request);
    
    const headers = RateLimiter.getHeaders(request);
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      return ResponseUtil.error(error.message, error.statusCode);
    }
    return ResponseUtil.error('Internal server error', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    RateLimiter.check(request);
    
    const response = await userController.updateProfile(request);
    
    const headers = RateLimiter.getHeaders(request);
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    if (error instanceof AppError) {
      return ResponseUtil.error(error.message, error.statusCode);
    }
    return ResponseUtil.error('Internal server error', 500);
  }
}