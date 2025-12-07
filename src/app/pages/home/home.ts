import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductList } from '../../shared/constants/products_examples';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';
import { ProductCard } from "../../shared/product-card/product-card";

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
export class Home {
  products: Product[] = ProductList;

  featuredList(id1: number, id2: number, id3: number, id4: number): Product[] {
    const ids = [id1, id2, id3, id4];

    return this.products.filter(x => ids.includes(x.id));
  }
}
