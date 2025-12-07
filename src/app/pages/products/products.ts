import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductList } from '../../shared/constants/products_examples';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCard
],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: Product[] = ProductList;
}
