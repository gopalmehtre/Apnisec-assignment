import { z } from 'zod';
import { ValidationError } from '../errors/AppError';

export class UserValidator {
  private static updateProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
  });

  static validateUpdateProfile(data: unknown) {
    try {
      return this.updateProfileSchema.parse(data);
    } catch (error: any) {
      throw new ValidationError(error.errors[0].message);
    }
  }
}