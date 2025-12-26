import { z } from 'zod';
import { ValidationError } from '../errors/AppError';
import { IssueType, Priority, Status } from '../types/issue.types';

export class IssueValidator {
  private static createSchema = z.object({
    type: z.nativeEnum(IssueType),
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    priority: z.nativeEnum(Priority).optional(),
    status: z.nativeEnum(Status).optional(),
  });

  private static updateSchema = z.object({
    type: z.nativeEnum(IssueType).optional(),
    title: z.string().min(5, 'Title must be at least 5 characters').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    priority: z.nativeEnum(Priority).optional(),
    status: z.nativeEnum(Status).optional(),
  });

  static validateCreate(data: unknown) {
    try {
      return this.createSchema.parse(data);
    } catch (error: any) {
      throw new ValidationError(error.errors[0].message);
    }
  }

  static validateUpdate(data: unknown) {
    try {
      return this.updateSchema.parse(data);
    } catch (error: any) {
      throw new ValidationError(error.errors[0].message);
    }
  }
}