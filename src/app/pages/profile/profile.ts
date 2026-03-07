import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LogoutService } from '../../services/logout/logout-service';

@Component({
  selector: 'app-profile',
  imports: [MatIcon, MatButton],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(private logoutService: LogoutService) { }

  logout() {
    this.logoutService.logout();
  }
}
