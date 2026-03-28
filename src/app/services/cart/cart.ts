import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CartSummaryItem } from '../../shared/models/cartSummaryItem';
import { BehaviorSubject, forkJoin, map, Observable, of, Subscription, tap } from 'rxjs';
import { NotificationService } from '../notification/notification-service';
import { ProductService } from '../product/product-service';

@Injectable({
  providedIn: 'root',
})
export class Cart implements OnDestroy {
  private cartContent: Product[] = [];
  private productsFromDatabase: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>(this.cartContent);
  private subscriptions: Subscription[] = [];

  cartContent$ = this.itemsSubject.asObservable();

  private STORAGE_KEY = 'cart';


  constructor(private notificationService: NotificationService, private productService: ProductService) {
    this.loadCartFromStorage();
  }

  cartItemCount$ = this.cartContent$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0))
  );

  getItems() {
    return this.cartContent;
  }

  addToCart(product: Product) {
    const existing = this.cartContent.find(item => item.id === product.id);

    if (existing) {
      this.increaseQuantity(product.id);
      return;
    }

    this.subscriptions.push(this.productService.getProductById(product.id).subscribe({
      next: (data) => {
        this.cartContent.push({ ...data, quantity: 1 });
        this.notificationService.success('Sikeresen hozzáadva a kosárhoz!', 600);
        this.productsFromDatabase.push(data);
        this.emitCart();
      },
      error: (err) => {
        console.error(err);
        this.notificationService.error('Hiba történt a termék lekérésekor!');
      }
    }));
  }

  increaseQuantity(id: number) {
    const item = this.cartContent.find(item => item.id === id);
    if (!item) {
      return;
    }

    const cachedProduct = this.productsFromDatabase.find(product => product.id === id);
    if (cachedProduct) {
      if (cachedProduct.quantity > (item.quantity ?? 0)) {
        item.quantity = (item.quantity ?? 0) + 1;
        this.emitCart();
      } else {
        this.notificationService.error('Nincs több termék készleten!');
      }
      return;
    }

    this.subscriptions.push(this.refreshProductsFromDatabase().subscribe({
      next: () => {
        const refreshedProduct = this.productsFromDatabase.find(product => product.id === id);
        if (refreshedProduct && refreshedProduct.quantity > (item.quantity ?? 0)) {
          item.quantity = (item.quantity ?? 0) + 1;
          this.emitCart();
        } else {
          this.notificationService.error('Nincs több termék készleten!');
        }
      },
      error: (err) => {
        console.error(err);
        this.notificationService.error('Hiba történt a termék lekérésekor!');
      }
    }));
  }

  decreaseQuantity(id: number) {
    const item = this.cartContent.find(item => item.id === id);

    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeItem(item.id);
      }

      this.emitCart();
    }
  }

  removeItem(id: number) {
    this.cartContent = this.cartContent.filter(item => item.id !== id);
    this.productsFromDatabase = this.productsFromDatabase.filter(item => item.id !== id);
    this.emitCart();
  }

  clearCart() {
    this.cartContent = [];
    this.emitCart();
  }

  private saveCartToStorage(items: Product[]) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadCartFromStorage() {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.cartContent = JSON.parse(data);
      this.emitCart();
    }
  }

  private emitCart() {
    this.itemsSubject.next([...this.cartContent]);
    this.saveCartToStorage([...this.cartContent]);
  }

  getCartSummary$(): Observable<CartSummaryItem[]> {
    return this.cartContent$.pipe(
      map(items =>
        items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          total: item.quantity * item.price
        }))
      )
    );
  }

  getTotalPrice$() {
    return this.cartContent$.pipe(
      map(items =>
        items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      )
    );
  }

  private refreshProductsFromDatabase(): Observable<Product[]> {
    const idsToFetch = this.cartContent
      .map(item => item.id)
      .filter(id => !this.productsFromDatabase.some(product => product.id === id));

    if (idsToFetch.length === 0) {
      return of(this.productsFromDatabase);
    }

    return forkJoin(idsToFetch.map(id => this.productService.getProductById(id))).pipe(
      tap(products => {
        this.productsFromDatabase = [...this.productsFromDatabase, ...products];
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
