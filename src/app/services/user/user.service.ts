import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, user, httpOptions);
  }

  deleteUser(User: User): Observable<User> {
    const url = `${this.apiUrl}/${User.id}`;
    return this.http.delete<User>(url);
  }
}
