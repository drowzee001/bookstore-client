import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;
  public token: string;

  private apiUrl = 'https://bookstore.donovanrowzee.com/users';

  constructor(private http: HttpClient) {}

  register(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: headers,
    });
  }

  login(email, password) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `${this.apiUrl}/login`,
      { email, password },
      {
        headers: headers,
      }
    );
  }

  authenticateUser() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.token,
    });
    return this.http.get(`${this.apiUrl}/`, { headers: headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user.firstName);
    this.token = token;
    this.user = user;
  }

  async loadToken() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      await this.authenticateUser()
        .toPromise()
        .then((data) => {
          this.user = data as User;
        })
        .catch((e) => console.log(e));
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
}
