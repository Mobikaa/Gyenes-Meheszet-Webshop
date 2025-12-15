import { Component } from '@angular/core';
import { MatInputModule, MatLabel, MatFormField } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatLabel,
    MatFormField,
    MatButtonModule,
    MatIconModule,
    RouterLink
],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
