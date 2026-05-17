import { Component, Input, OnInit } from '@angular/core';
import { Cart as CartService } from '../../services/cart/cart';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CartSummaryItem } from '../models/cartSummaryItem';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NumberSpacerPipe } from "../../pipes/number-spacer-pipe";
import {MatButtonModule} from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-summarize',
  imports: [
    CommonModule,
    AsyncPipe,
    NumberSpacerPipe,
    MatButtonModule
  ],
  templateUrl: './summarize.html',
  styleUrl: './summarize.scss',
})
export class Summarize implements OnInit {
  @Input() extraItems: CartSummaryItem[] = [];
  @Input() showExtraItems = false;

  summary$ !: Observable<CartSummaryItem[]>;
  total$ !: Observable<number>;
  isCheckout = false;

  get extraTotal(): number {
    return this.extraItems.reduce((sum, item) => sum + item.total, 0);
  }

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.summary$ = this.cartService.getCartSummary$();
    this.total$ = this.cartService.getTotalPrice$();
    this.isCheckout = this.router.url === '/checkout';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isCheckout = this.router.url === '/checkout';
    });
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
