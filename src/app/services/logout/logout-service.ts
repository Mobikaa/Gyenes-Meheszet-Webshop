import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login-service';
import { NotificationService } from '../notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) { }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loginService.setLoginStatus(false);
    this.notificationService.success('Sikeresen kijelentkezve!');
    this.router.navigate(['/login']);
  }
}
