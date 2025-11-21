import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductList } from '../../shared/constants/products_examples';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NumberSpacerPipe } from "../../pipes/number-spacer-pipe";

@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    MatButton,
    NumberSpacerPipe
],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: Product[] = ProductList;
}
