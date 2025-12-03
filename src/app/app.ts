import { Component, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from "./shared/menu/menu";
import { MatButtonModule } from '@angular/material/button';

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
    Menu
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Gyenes-Meheszet-Webshop');
  
  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
