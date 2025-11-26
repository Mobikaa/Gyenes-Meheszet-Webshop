import { Component } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    MatButtonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

}
