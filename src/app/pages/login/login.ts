import { Component, OnDestroy } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login/login-service';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatLabel,
    MatFormField,
    MatButtonModule,
    MatIconModule,
    RouterLink, 
    ReactiveFormsModule   
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnDestroy {
  private subscription: Subscription | undefined;

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  constructor(private loginService: LoginService) { }

  login() {

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (email === '' || email === null ||
      password === '' || password === null
    ) {
      console.error("Hibás adatok!");

      this.loginForm.controls.email.markAsTouched();
      this.loginForm.controls.password.markAsTouched();
      return;

    } else {
      console.log("email:" + email);
      console.log("password:" + password);
      this.subscription = this.loginService.login(email, password).subscribe({
        next: (res) => {
          console.log('Sikeres bejelentkezés', res);
        },
        error: (err) => {
          console.error('Hiba a bejelentkezésnél', err);
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
