import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from '../../Book';
import {
  faCartPlus,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faFileImage,
  faInfoCircle,
  faMinus,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/User';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  faTrashCan = faTrashAlt;
  faEdit = faEdit;
  faFileImage = faFileImage;
  faInfo = faInfoCircle;
  faAdd = faCartPlus;
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faBack = faChevronLeft;
  faNext = faChevronRight;
  currentUser: User;
  loading: boolean = true;
  books: Book[] = [];
  message: string = '';
  pages;
  currentPage: number = 1;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.bookService.getBooksCount().subscribe((count) => {
      this.pages = Array(Math.ceil(count / 10));
    });
    this.bookService.getBooks(1).subscribe((books) => {
      books.forEach((book) => {
        book.quantity = 1;
        book.confirm = false;
      });
      this.books = books;
      this.loading = false;
    });
  }

  loadPage(page: number) {
    this.bookService.getBooks(page).subscribe((books) => {
      books.forEach((book) => {
        book.quantity = 1;
        book.confirm = false;
      });
      this.currentPage = page;
      this.books = books;
      this.loading = false;
    });
  }

  deleteClick(book_id: string) {
    this.bookService.deleteBook(book_id).subscribe(() => {
      this.books = this.books.filter((b) => b._id !== book_id);
    });
  }

  addClick(book: Book) {
    if (book.confirm == false) {
      book.confirm = true;
      return;
    }
    this.addCart(book);
  }

  addCart(book: Book) {
    this.cartService
      .getCartItem(book._id)
      .subscribe((cartItem) => {
        if ((cartItem as any).length > 0) {
          if (
            cartItem[0].quantity + book.quantity > 15 &&
            cartItem[0].quantity < 15
          ) {
            alert(
              `Quantity it too large. Please select ${
                15 - cartItem[0].quantity
              } or fewer`
            );
          } else if (cartItem[0].quantity == 15) {
            alert('Quantity Limit Reached');
          } else {
            const updatedItem = {
              _id: cartItem[0]._id,
              user_id: this.currentUser._id,
              book_id: book._id,
              quantity: cartItem[0].quantity + book.quantity,
            };
            this.cartService.updateQuantity(updatedItem).subscribe(() => {
              this.message = `Item(s) Successfully Added: ${book.title} x ${book.quantity}`;
              book.confirm = false;
              book.quantity = 1;
              setTimeout(() => {
                this.message = '';
              }, 1500);
            });
          }
        } else {
          const newCartItem = {
            user_id: this.currentUser._id,
            book_id: book._id,
            quantity: book.quantity,
          };
          this.cartService.addCartItem(newCartItem).subscribe(() => {
            this.message = `Item(s) Successfully Added: ${book.title} x ${book.quantity}`;
            book.confirm = false;
            book.quantity = 1;
            setTimeout(() => {
              this.message = '';
            }, 1500);
          });
        }
      });
  }

  timeFormat(date: string): string {
    return new Date(date).toDateString().toString();
  }

  minusClick(book: Book): void {
    if (book.quantity > 1) {
      --book.quantity;
    }
  }
  plusClick(book: Book): void {
    if (book.quantity < 15) {
      ++book.quantity;
    }
  }
}
