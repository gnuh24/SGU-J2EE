import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

// Auth Selectors
export const selectAuth = createSelector(
  selectUserState,
  (state: UserState) => state.auth
);

export const selectCurrentUser = createSelector(
  selectAuth,
  (auth) => auth.currentUser
);

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => !!user
);

export const selectAuthLoading = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (auth) => auth.error
);

// Profile Selectors
export const selectProfile = createSelector(
  selectUserState,
  (state: UserState) => state.profile
);

export const selectProfileData = createSelector(
  selectProfile,
  (profile) => profile.data
);

export const selectProfileLoading = createSelector(
  selectProfile,
  (profile) => profile.loading
);

export const selectProfileError = createSelector(
  selectProfile,
  (profile) => profile.error
);

// UI Selectors
export const selectUI = createSelector(
  selectUserState,
  (state: UserState) => state.ui
);

export const selectIsMenuOpen = createSelector(
  selectUI,
  (ui) => ui.isMenuOpen
);

export const selectTheme = createSelector(
  selectUI,
  (ui) => ui.theme
);

export const selectNotifications = createSelector(
  selectUI,
  (ui) => ui.notifications
); 