import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(after?: number): Observable<Product[]> {
    let params = new HttpParams().set('limit', '10');
    if (after) {
      params = params.set('after', after.toString());
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getLength(){
    return this.http.get<{rows: number}>(`${this.apiUrl}/rows`);
  }
}
