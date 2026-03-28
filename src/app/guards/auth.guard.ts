import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login-service';
import { NotificationService } from '../services/notification/notification-service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private notificationService: NotificationService
    ) { }

    canActivate(): boolean {
        const token = sessionStorage.getItem('token');
        const isLoggedIn = this.loginService.isLoggedIn$;

        if (token && isLoggedIn) {
            return true;
        } else {
            this.notificationService.error('Nincs bejelentkezve! Kérem, jelentkezzen be a folytatáshoz.');
            this.router.navigate(['/login']);
            return false;
        }
    }
}
