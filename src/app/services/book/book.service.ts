import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../../Book';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.authService.token,
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks(page: number): Observable<Book[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<Book[]>(url, this.httpOptions);
  }

  getBooksCount(): Observable<number> {
    const url = `${this.apiUrl}/count`;
    return this.http.get<number>(url, this.httpOptions);
  }

  getBook(book_id: string) {
    const url = `${this.apiUrl}/${book_id}`;
    return this.http.get<Book>(url, this.httpOptions);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, { book }, this.httpOptions);
  }

  editBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/edit`;
    return this.http.post<Book>(url, { book }, this.httpOptions);
  }

  deleteBook(book_id: string): Observable<Book> {
    const url = `${this.apiUrl}/${book_id}`;
    return this.http.delete<Book>(url, this.httpOptions);
  }
}
