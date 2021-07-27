import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/CartItem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  faTrash = faTrashAlt;
  faFileImage = faFileImage;
  currentUser: User;
  loading: boolean = true;
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  taxes: number = 0;
  shipping: number = 0;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      cartItems.forEach((cartItem) => {
        this.bookService.getBook(cartItem.book_id).subscribe((book) => {
          cartItem.book = book;
          this.cartItems.push(cartItem);
          this.subtotal += +book.price * cartItem.quantity;
          this.subtotal = parseFloat(this.subtotal.toFixed(2));
          this.loading = false;
        });
      });
    });
  }

  formatNumber(num: Number): String {
    return num.toFixed(2);
  }

  orderClick(target): void {
    if (target.innerText == 'Order Now') {
      target.textContent = 'Confirm';
      return;
    }
    var items = [];
    this.cartItems.forEach((cartItem) => {
      items.push({
        id: cartItem._id,
        user_id: cartItem.user_id,
        book_id: cartItem.book_id,
        quantity: cartItem.quantity,
      });
    });
    const newOrder = {
      user_id: this.currentUser._id,
      items: items,
      subtotal: this.subtotal,
      taxes: this.taxes,
      shipping: this.shipping,
      orderTotal: parseFloat(
        (this.subtotal + this.taxes + this.shipping).toFixed(2)
      ),
      created: new Date(),
    };
    this.orderService.addOrder(newOrder).subscribe(() => {
      this.cartItems.forEach((item) => {
        this.cartService.deleteCartItem(item).subscribe();
      });
      this.router.navigate(['/orders'], { replaceUrl: true });
    });
  }
}
