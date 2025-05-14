import { createAction, props } from '@ngrx/store';
import { AuthResponseDTO } from '../../models/auth.model';
import { ProfileResponse } from '../../models/profile.model';

// Auth Actions
export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: AuthResponseDTO }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout');

// Profile Actions
export const loadProfile = createAction('[User] Load Profile');

export const loadProfileSuccess = createAction(
  '[User] Load Profile Success',
  props<{ profile: ProfileResponse }>()
);

export const loadProfileFailure = createAction(
  '[User] Load Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[User] Update Profile',
  props<{ profileData: any }>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ profile: ProfileResponse }>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);

// UI Actions
export const toggleMenu = createAction('[User] Toggle Menu');

export const setTheme = createAction(
  '[User] Set Theme',
  props<{ theme: 'light' | 'dark' }>()
);

export const showNotification = createAction(
  '[User] Show Notification',
  props<{ message: string; type: 'success' | 'error' | 'info' }>()
);

export const hideNotification = createAction(
  '[User] Hide Notification',
  props<{ index: number }>()
); 