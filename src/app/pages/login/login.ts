import { Component, OnDestroy } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login/login-service';
import { NotificationService } from '../../services/notification/notification-service';

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

  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  login() {

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (email === '' || email === null ||
      password === '' || password === null
    ) {
      this.notificationService.error("Kérjük, töltse ki az összes mezőt!");

      this.loginForm.controls.email.markAsTouched();
      this.loginForm.controls.password.markAsTouched();
      return;

    } else {
      this.subscription = this.loginService.login(email, password).subscribe({
        next: (res: any) => {
          //console.log('Sikeres bejelentkezés', res);
          if (res && res.token) {
            sessionStorage.setItem('token', res.token);

            if (res.user?.id != null) {
              sessionStorage.setItem('userId', String(res.user.id));
            }

            this.loginService.setLoginStatus(true);
            this.notificationService.success('Sikeres bejelentkezés!');
            
            this.loginForm.reset();
            
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          console.error('Hiba a bejelentkezésnél', err);
          this.notificationService.error('Bejelentkezés sikertelen! Hibás email vagy jelszó.');
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
