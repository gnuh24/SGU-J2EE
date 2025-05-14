import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import * as UserActions from './user.actions';

export const initialState: UserState = {
  auth: {
    currentUser: null,
    loading: false,
    error: null
  },
  profile: {
    data: null,
    loading: false,
    error: null
  },
  ui: {
    isMenuOpen: false,
    theme: 'light',
    notifications: []
  }
};

export const userReducer = createReducer(
  initialState,
  
  // Auth Reducers
  on(UserActions.login, (state) => ({
    ...state,
    auth: {
      ...state.auth,
      loading: true,
      error: null
    }
  })),
  
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    auth: {
      currentUser: user,
      loading: false,
      error: null
    }
  })),
  
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      error
    }
  })),
  
  on(UserActions.logout, (state) => ({
    ...state,
    auth: {
      currentUser: null,
      loading: false,
      error: null
    }
  })),

  // Profile Reducers
  on(UserActions.loadProfile, (state) => ({
    ...state,
    profile: {
      ...state.profile,
      loading: true,
      error: null
    }
  })),
  
  on(UserActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: {
      data: profile,
      loading: false,
      error: null
    }
  })),
  
  on(UserActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    profile: {
      ...state.profile,
      loading: false,
      error
    }
  })),

  // UI Reducers
  on(UserActions.toggleMenu, (state) => ({
    ...state,
    ui: {
      ...state.ui,
      isMenuOpen: !state.ui.isMenuOpen
    }
  })),
  
  on(UserActions.setTheme, (state, { theme }) => ({
    ...state,
    ui: {
      ...state.ui,
      theme
    }
  })),
  
  on(UserActions.showNotification, (state, { message, type }) => ({
    ...state,
    ui: {
      ...state.ui,
      notifications: [
        ...state.ui.notifications,
        { message, type, show: true }
      ]
    }
  })),
  
  on(UserActions.hideNotification, (state, { index }) => ({
    ...state,
    ui: {
      ...state.ui,
      notifications: state.ui.notifications.filter((_, i) => i !== index)
    }
  }))
); 