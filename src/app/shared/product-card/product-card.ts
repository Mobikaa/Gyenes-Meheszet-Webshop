import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { NumberSpacerPipe } from "../../pipes/number-spacer-pipe";
import { Product } from '../models/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NumberSpacerPipe
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
}
