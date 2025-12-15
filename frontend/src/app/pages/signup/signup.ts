import { Component } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  imports: [
    MatFormField,
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

}
