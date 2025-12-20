import { Component } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { SignupService } from '../../services/signup/signup-service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

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
export class Signup {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    reEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  }
);

  constructor(private signupService: SignupService) { }

  register() {
    //this.signupService.register(this.email, this.password);
  }

}
