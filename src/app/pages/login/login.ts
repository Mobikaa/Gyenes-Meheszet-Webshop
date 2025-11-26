import { Component } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatLabel,
    MatFormField,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
