import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as UserActions from '../../../store/user/user.actions';
import * as UserSelectors from '../../../store/user/user.selectors';
import { Profile } from '../../../models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile$: Observable<Profile | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      fullname: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.profile$ = this.store.select(UserSelectors.selectProfileData);
    this.loading$ = this.store.select(UserSelectors.selectProfileLoading);
    this.error$ = this.store.select(UserSelectors.selectProfileError);
  }

  ngOnInit(): void {
    // Load profile data
    this.store.dispatch(UserActions.loadProfile());

    // Subscribe to profile changes
    this.profile$.subscribe(profile => {
      if (profile) {
        this.profileForm.patchValue(profile);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.getRawValue();
      this.store.dispatch(UserActions.updateProfile({ profileData }));
    }
  }
}
