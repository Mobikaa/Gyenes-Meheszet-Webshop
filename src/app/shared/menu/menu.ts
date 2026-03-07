import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { LogoutService } from '../../services/logout/logout-service';
import { LoginService } from '../../services/login/login-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit, OnDestroy {

  @Input() sidenav!: MatSidenav;
  isLoggedIn: boolean = false;
  private subscription: Subscription | undefined;
  
  constructor(
    private logoutService: LogoutService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.subscription = this.loginService.isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  closeMenu(){
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.logoutService.logout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
