import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from "./shared/menu/menu";
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Cart as CartService } from './services/cart';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
    Menu,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('Gyenes-Meheszet-Webshop');  
  cartItemCount$!: Observable<number>;
  private hidden = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItemCount$ = this.cartService.cartItemCount$;
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
