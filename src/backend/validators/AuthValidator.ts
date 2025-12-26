import { z } from 'zod';
import { ValidationError } from '../errors/AppError';

export class AuthValidator {
  private static registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  });

  private static loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  static validateRegister(data: unknown) {
    try {
      return this.registerSchema.parse(data);
    } catch (error: any) {
      throw new ValidationError(error.errors[0].message);
    }
  }

  static validateLogin(data: unknown) {
    try {
      return this.loginSchema.parse(data);
    } catch (error: any) {
      throw new ValidationError(error.errors[0].message);
    }
  }
}