import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as UserActions from './user.actions';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  // Auth Effects
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => UserActions.loginSuccess({ user })),
          catchError(error => of(UserActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  // Profile Effects
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      mergeMap(() =>
        this.profileService.getProfile().pipe(
          map(profile => UserActions.loadProfileSuccess({ profile })),
          catchError(error => of(UserActions.loadProfileFailure({ error: error.message })))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateProfile),
      mergeMap(({ profileData }) =>
        this.profileService.updateProfile(profileData).pipe(
          map(profile => UserActions.updateProfileSuccess({ profile })),
          catchError(error => of(UserActions.updateProfileFailure({ error: error.message })))
        )
      )
    )
  );

  // UI Effects
  showNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.showNotification),
      tap(({ message, type }) => {
        // Có thể thêm logic hiển thị notification ở đây
        console.log(`Notification: ${message} (${type})`);
      })
    ),
    { dispatch: false }
  );
} 