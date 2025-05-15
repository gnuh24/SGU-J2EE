export interface AuthResponseDTO {
  data: {
    token: string;
    refreshToken: string;
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  message: string;
  status: number;
} 