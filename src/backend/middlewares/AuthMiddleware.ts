import { NextRequest } from 'next/server';
import { JWTUtil } from '../utils/jwtUtil';
import { UnauthorizedError } from '../errors/AppError';
import { JWTPayload } from '../types/auth.types';

export class AuthMiddleware {
  static authenticate(request: NextRequest): JWTPayload {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);

    try {
      const payload = JWTUtil.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  static getTokenFromCookies(request: NextRequest): string | null {
    return request.cookies.get('token')?.value || null;
  }

  static authenticateFromCookies(request: NextRequest): JWTPayload {
    const token = this.getTokenFromCookies(request);

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    try {
      return JWTUtil.verify(token);
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}