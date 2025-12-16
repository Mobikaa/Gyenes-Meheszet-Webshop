import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { CartSummaryItem } from '../../shared/models/cartSummaryItem';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartContent: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>(this.cartContent);

  cartContent$ = this.itemsSubject.asObservable();

  private STORAGE_KEY = 'cart';


  constructor() {
    this.loadCartFromStorage();
  }

  cartItemCount$ = this.cartContent$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0))
  );

  getItems() {
    return this.cartContent;
  }

  //Adding an item into the cart.
  addToCart(product: Product) {
    const existing = this.cartContent.find(item => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity ?? 1) + 1;
    }
    else {
      this.cartContent.push({ ...product, quantity: 1 });
    }

    this.emitCart();
  }

  //Increasing the quality of an existing item in the cart.
  increaseQuantity(id: number) {
    const item = this.cartContent.find(item => item.id === id);

    if (item) {
      item.quantity++;
      this.emitCart();
    }
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

  //Removing a single item from the cart.
  removeItem(id: number) {
    this.cartContent = this.cartContent.filter(item => item.id !== id);
    this.emitCart();
  }

  //Fully clearing the cart.
  clearCart() {
    this.cartContent = [];
    this.emitCart();
  }

  //Saving the cart content into a session storage so the user can refresh the page without clearing the cart.
  private saveCartToStorage(items: Product[]) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  //This loads the cart content from the session storage.
  private loadCartFromStorage() {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.cartContent = JSON.parse(data);
      this.emitCart();
    }
  }

  //Make the code cleaner by calling this function when the cart content changes.
  private emitCart() {
    this.itemsSubject.next([...this.cartContent]);
    this.saveCartToStorage([...this.cartContent]);
  }

  //This method gives a list that shows the items in the cart, their quantity and their price summed.
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

  //This is for the summarize component to show the full price of the order
  getTotalPrice$() {
    return this.cartContent$.pipe(
      map(items =>
        items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      )
    );
  }
}
