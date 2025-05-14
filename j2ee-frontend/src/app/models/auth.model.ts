export interface AuthResponseDTO {
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