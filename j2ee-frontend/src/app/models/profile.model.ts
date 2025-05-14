export interface ProfileResponseDTO {
  data : {
    id: string
    token: string;
    email: string;
    tokenExpirationTime?: string;
    refreshToken?: string;
    refreshTokenExpirationTime?: string;
    role?: string;
}
}

export interface ProfileResponse {
  status: number;
  message: string;
  data: {
    id: string;
    fullname: string;
    email: string;
    phone: string;
  }
} 