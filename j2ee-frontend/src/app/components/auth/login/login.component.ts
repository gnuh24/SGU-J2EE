import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as UserActions from '../../../store/user/user.actions';
import * as UserSelectors from '../../../store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loading$ = this.store.select(UserSelectors.selectAuthLoading);
    this.error$ = this.store.select(UserSelectors.selectAuthError);
  }

  ngOnInit(): void {
    // Kiểm tra nếu đã đăng nhập thì chuyển về trang chủ
    this.store.select(UserSelectors.selectIsAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(UserActions.login({ email, password }));
    }
  }
} 