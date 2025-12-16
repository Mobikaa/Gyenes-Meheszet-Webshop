import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductCard } from '../../shared/product-card/product-card';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../../services/product/product-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCard,
    MatButton
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadMore() {
    const lastId = this.products.at(-1)?.id;
    this.productService.getProducts(lastId)
      .subscribe(newProducts => {
        this.products = [...this.products, ...newProducts];
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
