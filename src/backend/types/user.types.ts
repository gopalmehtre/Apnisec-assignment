export interface UpdateProfileDTO {
  name?: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}