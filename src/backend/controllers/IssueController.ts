import { NextRequest, NextResponse } from 'next/server';
import { IssueService } from '../services/IssueService';
import { IssueValidator } from '../validators/IssueValidator';
import { ResponseUtil } from '../utils/ResponseUtil';
import { AppError } from '../errors/AppError';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { IssueType } from '../types/issue.types';

export class IssueController {
  private issueService: IssueService;

  constructor() {
    this.issueService = new IssueService();
  }

  async createIssue(request: NextRequest): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const body = await request.json();
      const validatedData = IssueValidator.validateCreate(body);

      const issue = await this.issueService.createIssue(payload.userId, validatedData);

      return ResponseUtil.success(issue, 'Issue created successfully', 201);
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to create issue', 500);
    }
  }

  async getIssues(request: NextRequest): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') as IssueType | undefined;

      const issues = await this.issueService.getIssues(payload.userId, type);

      return ResponseUtil.success(issues);
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to get issues', 500);
    }
  }

  async getIssueById(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const issue = await this.issueService.getIssueById(payload.userId, id);

      return ResponseUtil.success(issue);
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to get issue', 500);
    }
  }

  async updateIssue(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      const body = await request.json();
      const validatedData = IssueValidator.validateUpdate(body);

      const issue = await this.issueService.updateIssue(
        payload.userId,
        id,
        validatedData
      );

      return ResponseUtil.success(issue, 'Issue updated successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to update issue', 500);
    }
  }

  async deleteIssue(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const payload = AuthMiddleware.authenticateFromCookies(request);
      await this.issueService.deleteIssue(payload.userId, id);

      return ResponseUtil.success(null, 'Issue deleted successfully');
    } catch (error) {
      if (error instanceof AppError) {
        return ResponseUtil.error(error.message, error.statusCode);
      }
      return ResponseUtil.error('Failed to delete issue', 500);
    }
  }
}