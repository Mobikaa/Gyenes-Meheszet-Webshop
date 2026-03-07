import { Component, DoCheck, OnDestroy } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { SignupService } from '../../services/signup/signup-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchFieldsValidator } from './match-field-validator';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification/notification-service';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnDestroy {

  private emailRegex: RegExp = /^[a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9])?@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

  private subscription: Subscription | undefined;


  readonly signUpForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]
    }),
    reEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: [
      matchFieldsValidator('email', 'reEmail', 'emailsMismatch'),
      matchFieldsValidator('password', 'rePassword', 'passwordsMismatch')
    ]
  }
  );

  constructor(
    private signupService: SignupService,
    private notificationService: NotificationService
  ) { }

  register() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const email = this.signUpForm.controls.email.value;
    const password = this.signUpForm.controls.password.value;

    if (email === '' || password === '' || this.signUpForm.invalid) {
      console.error("Hibás adatok!")
    } else {
      this.subscription = this.signupService.register(email, password).subscribe({
        next: (res) => {
          this.notificationService.success('Sikeres regisztráció!');
        },
        error: (err) => {
          this.notificationService.error('Hiba a regisztrációnál!');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
