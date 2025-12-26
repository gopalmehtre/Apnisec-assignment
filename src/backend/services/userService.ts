import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { UpdateProfileDTO } from '../types/user.types';
import { ValidationError } from '../errors/AppError';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ValidationError('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<Omit<User, 'password'>> {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ValidationError('Email already in use');
      }
    }

    const user = await this.userRepository.update(userId, data);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}