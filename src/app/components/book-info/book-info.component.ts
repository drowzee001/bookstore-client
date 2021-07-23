import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faFileImage,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/Book';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css'],
})
export class BookInfoComponent implements OnInit {
  book_id: string;
  book: Book;
  quantity: number = 1;
  faFileImage = faFileImage;
  faMinus = faMinus;
  faPlus = faPlus;
  loading: boolean = true;
  currentUser: User;
  message: string = '';

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.book_id = params['id'];
      this.bookService.getBook(this.book_id).subscribe((book) => {
        this.book = book;
        this.loading = false;
      });
    });
  }
  minusClick(): void {
    if (this.quantity > 1) {
      --this.quantity;
    }
  }
  plusClick(): void {
    if (this.quantity < 15) {
      ++this.quantity;
    }
  }
  addCartClick(target) {
    if (target.innerText == 'Add to Cart') {
      target.textContent = 'Confirm';
    } else {
      this.cartService
        .getCartItem(this.book._id, this.currentUser.id)
        .subscribe((cartItem) => {
          if ((cartItem as any).length > 0) {
            if (
              cartItem[0].quantity + this.quantity > 15 &&
              cartItem[0].quantity < 15
            ) {
              alert(
                `Quantity it too large. Please select ${
                  15 - cartItem[0].quantity
                } or fewer`
              );
            } else if (cartItem[0].quantity == 15) {
              alert('Quantitiy Limit Reached');
            } else {
              const updatedItem = {
                id: cartItem[0].id,
                user_id: this.currentUser.id,
                book_id: this.book._id,
                quantity: cartItem[0].quantity + this.quantity,
              };
              this.cartService.updateQuantity(updatedItem).subscribe(() => {
                this.message = `Item(s) Successfully Added: ${this.book.title} x ${this.quantity}`;
                target.textContent = 'Add to Cart';
                this.quantity = 1;
                setTimeout(() => {
                  this.message = '';
                }, 1500);
              });
            }
          } else {
            const newCartItem = {
              user_id: this.currentUser.id,
              book_id: this.book._id,
              quantity: this.quantity,
            };
            this.cartService.addCartItem(newCartItem).subscribe(() => {
              this.message = `Item(s) Successfully Added: ${this.book.title} x ${this.quantity}`;
              target.textContent = 'Add to Cart';
              this.quantity = 1;
              setTimeout(() => {
                this.message = '';
              }, 1500);
            });
          }
        });
    }
  }
}
