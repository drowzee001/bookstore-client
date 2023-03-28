import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../../CartItem';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //private apiUrl = 'https://bookstore.donovanrowzee.com/cartItems';
  private apiUrl = 'http://localhost:3000/cartItems';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCartItems(): Observable<CartItem[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<CartItem[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  getCartItem(book_id: string): Observable<CartItem[]> {
    const url = `${this.apiUrl}/${book_id}`;
    return this.http.get<CartItem[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(
      this.apiUrl,
      { cartItem },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      }
    );
  }

  deleteCartItem(CartItem: CartItem): Observable<CartItem> {
    const url = `${this.apiUrl}/${CartItem._id}`;
    return this.http.delete<CartItem>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  updateQuantity(cartItem: CartItem) {
    const url = `${this.apiUrl}/update`;
    return this.http.post<CartItem>(
      url,
      { cartItem },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      }
    );
  }
}
