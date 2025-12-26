import { Issue } from '@prisma/client';
import { IssueRepository } from '../repositories/IssueRepository';
import { UserRepository } from '../repositories/userRepository';
import { EmailService } from './EmailService';
import {
  CreateIssueDTO,
  UpdateIssueDTO,
  IssueType,
} from '../types/issue.types';
import { NotFoundError, ForbiddenError } from '../errors/AppError';

type IssueWithUser = Awaited<ReturnType<IssueRepository['findById']>>;

export class IssueService {
  private issueRepository: IssueRepository;
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.issueRepository = new IssueRepository();
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  async createIssue(userId: string, data: CreateIssueDTO): Promise<IssueWithUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const issue = await this.issueRepository.create({
      ...data,
      userId,
    });

    await this.emailService.sendIssueCreatedEmail(user.email, user.name, {
      type: issue.type,
      title: issue.title,
      description: issue.description,
    });

    return issue;
  }

  async getIssues(userId: string, type?: IssueType): Promise<IssueWithUser[]> {
    return this.issueRepository.findByUserId(userId, type);
  }

  async getIssueById(userId: string, issueId: string): Promise<IssueWithUser> {
    const issue = await this.issueRepository.findById(issueId);
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    if (issue.userId !== userId) {
      throw new ForbiddenError('You do not have access to this issue');
    }

    return issue;
  }

  async updateIssue(
    userId: string,
    issueId: string,
    data: UpdateIssueDTO
  ): Promise<IssueWithUser> {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new ForbiddenError('You do not have access to this issue');
    }

    return this.issueRepository.update(issueId, data);
  }

  async deleteIssue(userId: string, issueId: string): Promise<void> {
    const isOwner = await this.issueRepository.isOwner(issueId, userId);
    if (!isOwner) {
      throw new ForbiddenError('You do not have access to this issue');
    }

    await this.issueRepository.delete(issueId);
  }
}