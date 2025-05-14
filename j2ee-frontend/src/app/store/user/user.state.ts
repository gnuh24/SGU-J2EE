import { AuthResponseDTO } from '../../models/auth.model';
import { ProfileResponse } from '../../models/profile.model';

export interface UserState {
  auth: {
    currentUser: AuthResponseDTO | null;
    loading: boolean;
    error: string | null;
  };
  profile: {
    data: ProfileResponse | null;
    loading: boolean;
    error: string | null;
  };
  ui: {
    isMenuOpen: boolean;
    theme: 'light' | 'dark';
    notifications: {
      message: string;
      type: 'success' | 'error' | 'info';
      show: boolean;
    }[];
  };
} 