import { NextRequest } from 'next/server';
import { AuthController } from '@/backend/controllers/AuthController';
import { RateLimiter } from '@/backend/middlewares/RateLimiter';
import { ResponseUtil } from '@/backend/utils/ResponseUtil';
import { AppError } from '@/backend/errors/AppError';

const authController = new AuthController();

export async function POST(request: NextRequest) {
  try {
    RateLimiter.check(request);

    const response = await authController.register(request);
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
