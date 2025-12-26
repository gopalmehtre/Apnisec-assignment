import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { PasswordUtil } from '../utils/PasswordUtil';
import { JWTUtil } from '../utils/jwtUtil';
import { EmailService } from './EmailService';
import {
  ValidationError,
  UnauthorizedError,
} from '../errors/AppError';
import { AuthResponse, RegisterDTO, LoginDTO } from '../types/auth.types';

export class AuthService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  async register(data: RegisterDTO): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    if (!PasswordUtil.validate(data.password)) {
      throw new ValidationError(
        'Password must be at least 8 characters with uppercase, lowercase, and number'
      );
    }

    const hashedPassword = await PasswordUtil.hash(data.password);

    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    await this.emailService.sendWelcomeEmail(user.email, user.name);

    const token = JWTUtil.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValidPassword = await PasswordUtil.compare(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = JWTUtil.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async getCurrentUser(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}