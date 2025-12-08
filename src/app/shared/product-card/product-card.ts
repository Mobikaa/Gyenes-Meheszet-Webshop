import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NumberSpacerPipe } from "../../pipes/number-spacer-pipe";
import { Product } from '../models/product';
import { MatButtonModule } from '@angular/material/button';
import { Cart as CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NumberSpacerPipe,
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
