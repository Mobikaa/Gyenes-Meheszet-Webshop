import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductCard } from '../../shared/product-card/product-card';
import { MatButton } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product/product-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCard,
    MatButton,
    MatProgressSpinnerModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnDestroy {
  private productsSubscription: Subscription | undefined;
  private lengthSubscription: Subscription | undefined;
  products: Product[] = [];
  totalProducts: Number = 0;
  loading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);        
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });

    this.lengthSubscription = this.productService.getLength().subscribe(res => {
      this.totalProducts = res.rows;    
    });
  }

  loadMore() {
    this.loading = true;
    const lastId = this.products.at(-1)?.id;
    this.productService.getProducts(lastId)
      .subscribe(newProducts => {
        this.products = [...this.products, ...newProducts];
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.lengthSubscription?.unsubscribe();
  }
}
