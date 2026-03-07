import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductList } from '../../shared/constants/products_examples';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
import { ProductCard } from "../../shared/product-card/product-card";
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product-service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIcon,
    ProductCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getFeaturedProducts([1,2,3,4]).subscribe({
      next: (data) => {
        this.products = data;
        //console.log(this.products);
        
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
