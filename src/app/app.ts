import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Menu } from "./shared/menu/menu";
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Cart as CartService } from './services/cart/cart';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoginService } from './services/login/login-service';
import { LogoutService } from './services/logout/logout-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenav,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatSnackBarModule,
    Menu,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Gyenes-Meheszet-Webshop');  
  cartItemCount$!: Observable<number>;
  isLoggedIn: boolean = false;
  private subscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private logoutService: LogoutService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.cartItemCount$ = this.cartService.cartItemCount$;
    this.subscription = this.loginService.isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  logout(): void {
    this.logoutService.logout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
