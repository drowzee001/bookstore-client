import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faFileImage,
  faMinus,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/CartItem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faTrash = faTrashAlt;
  faFileImage = faFileImage;
  faPlus = faPlus;
  faMinus = faMinus;
  currentUser: User;
  loading: boolean = true;
  noItems: boolean = false;
  cartItems: CartItem[] = [];

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .subscribe((cartItems) => {
        cartItems.forEach((cartItem) => {
          this.bookService.getBook(cartItem.book_id).subscribe((book) => {
            cartItem.book = book;
            this.cartItems.push(cartItem);
            this.loading = false;
          });
        });
        if (cartItems.length == 0) {
          this.noItems = true;
          this.loading = false;
        }
      });
  }

  checkoutClick(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert('Please add items to your cart');
    }
  }

  deleteClick(cartItem: CartItem) {
    this.cartService.deleteCartItem(cartItem).subscribe(() => {
      this.cartItems = this.cartItems.filter((c) => c._id !== cartItem._id);
      if (this.cartItems.length == 0) {
        this.noItems = true;
      }
    });
  }

  minusClick(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      const updatedItem = {
        _id: cartItem._id,
        user_id: this.currentUser._id,
        book_id: cartItem.book._id,
        quantity: --cartItem.quantity,
      };
      this.cartService.updateQuantity(updatedItem).subscribe();
    }
  }
  plusClick(cartItem: CartItem): void {
    if (cartItem.quantity < 15) {
      const updatedItem = {
        _id: cartItem._id,
        user_id: this.currentUser._id,
        book_id: cartItem.book._id,
        quantity: ++cartItem.quantity,
      };
      this.cartService.updateQuantity(updatedItem).subscribe();
    }
  }
}
