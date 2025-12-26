import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { NotFoundError } from '../errors/AppError';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async update(
    id: string,
    data: { name?: string; email?: string }
  ): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async exists(email: string): Promise<boolean> {
    const count = await prisma.user.count({
      where: { email },
    });
    return count > 0;
  }
}