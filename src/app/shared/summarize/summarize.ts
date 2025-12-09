import { Component, OnInit } from '@angular/core';
import { Cart as CartService } from '../../services/cart';
import { Observable } from 'rxjs';
import { CartSummaryItem } from '../models/cartSummaryItem';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NumberSpacerPipe } from "../../pipes/number-spacer-pipe";

@Component({
  selector: 'app-summarize',
  imports: [
    CommonModule,
    AsyncPipe,
    NumberSpacerPipe
  ],
  templateUrl: './summarize.html',
  styleUrl: './summarize.scss',
})
export class Summarize implements OnInit {
  summary$ !: Observable<CartSummaryItem[]>;
  total$ !: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.summary$ = this.cartService.getCartSummary$();
    this.total$ = this.cartService.getTotalPrice$();
  }
}
