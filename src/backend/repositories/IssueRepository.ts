import { prisma } from '@/lib/prisma';
import { Issue, IssueType, Priority, Status, User } from '@prisma/client';
import { NotFoundError } from '../errors/AppError';

type IssueWithUser = Issue & {
  user: Pick<User, 'id' | 'name' | 'email'>;
};

export class IssueRepository {
  async findById(id: string): Promise<IssueWithUser | null> {
    return prisma.issue.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUserId(
    userId: string,
    type?: IssueType
  ): Promise<IssueWithUser[]> {
    return prisma.issue.findMany({
      where: {
        userId,
        ...(type && { type }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async create(data: {
    type: IssueType;
    title: string;
    description: string;
    priority?: Priority;
    status?: Status;
    userId: string;
  }): Promise<IssueWithUser> {
    return prisma.issue.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      type?: IssueType;
      title?: string;
      description?: string;
      priority?: Priority;
      status?: Status;
    }
  ): Promise<IssueWithUser> {
    const issue = await prisma.issue.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    return issue;
  }

  async delete(id: string): Promise<void> {
    await prisma.issue.delete({
      where: { id },
    });
  }

  async isOwner(issueId: string, userId: string): Promise<boolean> {
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      select: { userId: true },
    });

    return issue?.userId === userId;
  }
}