import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../Order';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://bookstore-server.donovanrowzee.net/orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders(): Observable<Order[]> {
    if (this.authService.user.admin) {
      const url = `${this.apiUrl}/all`;
      return this.http.get<Order[]>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      });
    } else {
      return this.http.get<Order[]>(this.apiUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      });
    }
  }

  getOrder(id: string): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.apiUrl,
      { order },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      }
    );
  }

  deleteOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${order._id}`;
    return this.http.delete<Order>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }
}
