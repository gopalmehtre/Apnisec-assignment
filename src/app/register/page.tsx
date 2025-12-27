import { RegisterForm } from '@/components/auth/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - ApniSec',
  description: 'Create your ApniSec account to get started with enterprise cybersecurity solutions',
};

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4">
      <RegisterForm />
    </div>
  );
}