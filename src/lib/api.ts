interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data.data;
  }

  async register(data: { email: string; password: string; name: string }) {
    return this.request<any>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<any>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request<any>('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request<any>('/api/auth/me', {
      method: 'GET',
    });
  }

  async getIssues(type?: string) {
    const query = type ? `?type=${type}` : '';
    return this.request<any>(`/api/issues${query}`, {
      method: 'GET',
    });
  }

  async getIssue(id: string) {
    return this.request<any>(`/api/issues/${id}`, {
      method: 'GET',
    });
  }

  async createIssue(data: any) {
    return this.request<any>('/api/issues', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIssue(id: string, data: any) {
    return this.request<any>(`/api/issues/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteIssue(id: string) {
    return this.request<any>(`/api/issues/${id}`, {
      method: 'DELETE',
    });
  }

  async getProfile() {
    return this.request<any>('/api/users/profile', {
      method: 'GET',
    });
  }

  async updateProfile(data: { name?: string; email?: string }) {
    return this.request<any>('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();