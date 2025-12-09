import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Cart as CartService } from '../../services/cart';
import { Product } from '../../shared/models/product';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Summarize } from "../../shared/summarize/summarize";

@Component({
  selector: 'app-cart',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Summarize
],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.subscription = this.cartService.cartContent$.subscribe(items => {
      console.log("Kosár tartalma frissült:", items);
      this.cartItems = items;
    });
  }

  increaseQuantity(item: Product) {
    this.cartService.increaseQuantity(item.id);
  }

  decreaseQuantity(item: Product) {
    this.cartService.decreaseQuantity(item.id);
  }

  removeItem(item: Product) {
    this.cartService.removeItem(item.id);
  }

  ngOnDestroy() {
    console.log("CartComponent elpusztult, leiratkozás...");
    this.subscription?.unsubscribe();
  }
}
