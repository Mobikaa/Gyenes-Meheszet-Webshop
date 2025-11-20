import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './notfound.html',
  styleUrl: './notfound.scss',
})
export class Notfound {

}
