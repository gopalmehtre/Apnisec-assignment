import { NextRequest } from 'next/server';
import { AuthController } from '@/backend/controllers/AuthController';
import { ResponseUtil } from '@/backend/utils/ResponseUtil';

const authController = new AuthController();

export async function POST(request: NextRequest) {
  try {
    return await authController.logout(request);
  } catch (error) {
    return ResponseUtil.error('Internal server error', 500);
  }
}