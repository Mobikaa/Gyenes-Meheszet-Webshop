import { Component, Output, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from "./shared/menu/menu";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenav,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
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
