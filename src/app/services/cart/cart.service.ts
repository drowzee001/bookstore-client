import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../../CartItem';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/cartItems';

  constructor(private http: HttpClient) {}

  getCartItems(user_id: string): Observable<CartItem[]> {
    const url = `${this.apiUrl}?user_id=${user_id}`;
    return this.http.get<CartItem[]>(url);
  }

  getCartItem(book_id: string, user_id: string): Observable<CartItem> {
    const url = `${this.apiUrl}?user_id=${user_id}&book_id=${book_id}`;
    return this.http.get<CartItem>(url);
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, cartItem, httpOptions);
  }

  deleteCartItem(CartItem: CartItem): Observable<CartItem> {
    const url = `${this.apiUrl}/${CartItem.id}`;
    return this.http.delete<CartItem>(url);
  }

  updateQuantity(cartItem: CartItem) {
    const url = `${this.apiUrl}/${cartItem.id}`;
    return this.http.put<CartItem>(url, cartItem, httpOptions);
  }
}
