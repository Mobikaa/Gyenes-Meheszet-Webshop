import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { LogoutService } from '../../services/logout/logout-service';
import { ProfileService } from '../../services/profile/profile-service';
import { User } from '../../shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [
    MatIcon,
    MatButton,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit, OnDestroy {
  user?: User;
  editMode = false;
  updatedAddress?: User['address'];
  private subscriptions: Subscription[] = [];

  readonly AdddressForm = new FormGroup({
    full_name: new FormControl(),
    phone_number: new FormControl(),
    country: new FormControl(),
    postal_code: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    house_number: new FormControl(),
    floor_door: new FormControl(),
  });

  constructor(
    private logoutService: LogoutService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userId = Number(sessionStorage.getItem('userId'));

    if (!token || !userId) {
      console.warn('No token or userId found in sessionStorage');
      return;
    }

    this.subscriptions.push(
      this.profileService.getUserProfile(userId, token).subscribe({
        next: (user) => {
          this.user = user;
          console.log('Loaded user profile from API:', user);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      }));
  }

  startEdit() {
    if (!this.user?.address) {
      return;
    }
    this.updatedAddress = { ...this.user.address };
    this.AdddressForm.patchValue(this.updatedAddress);
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.updatedAddress = undefined;
    this.AdddressForm.reset();
  }

  saveAddress() {
    if (!this.user) {
      return;
    }

    const token = sessionStorage.getItem('token');
    const userId = Number(sessionStorage.getItem('userId'));

    if (!token || !userId) {
      console.warn('Missing token/userId. Cannot save address.');
      return;
    }

    this.updatedAddress = this.AdddressForm.value as User['address'];

    this.subscriptions.push(
      this.profileService.updateUserProfile(userId, { address: this.updatedAddress }, token).subscribe({
        next: (user) => {
          this.user = user;
          this.editMode = false;
          this.updatedAddress = undefined;
          console.log('User address updated', user);
        },
        error: (err) => {
          console.error('Failed to save address', err);
        }
      })
    );
  }

  logout() {
    this.logoutService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
