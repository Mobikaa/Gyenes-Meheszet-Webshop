import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  @Input() sidenav!: MatSidenav;
  
  closeMenu(){
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
