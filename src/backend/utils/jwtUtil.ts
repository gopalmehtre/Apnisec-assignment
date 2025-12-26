import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/auth.types';

export class JWTUtil {
  private static readonly SECRET = process.env.JWT_SECRET!;
  private static readonly EXPIRES_IN = '7d';

  static sign(payload: JWTPayload): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }

  static verify(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static decode(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}