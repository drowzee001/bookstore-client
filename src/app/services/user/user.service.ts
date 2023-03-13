import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://bookstore.donovanrowzee.com/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<User[]>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  addUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/`;
    return this.http.post<User>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }

  editUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/edit`;
    return this.http.post<User>(
      url,
      { user },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.authService.token,
        }),
      }
    );
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user._id}`;
    return this.http.delete<User>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.authService.token,
      }),
    });
  }
}
