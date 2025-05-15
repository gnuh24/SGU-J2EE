export interface UserData {
  id: string;
  email: string;
  role: string;
  token: string;
  refreshToken: string;
  tokenExpirationTime: string;
  refreshTokenExpirationTime: string;
  fullName?: string;
} 