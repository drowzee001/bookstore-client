import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/Book';
import { Order } from 'src/app/Order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { OrderService } from 'src/app/services/order/order.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  currentUser: User;
  order: Order;
  books: Book[] = [];
  faFileImage = faFileImage;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderService.getOrder(params['id']).subscribe((order) => {
        order[0].items.forEach((item) => {
          this.order = order[0];
          this.bookService.getBook(item.book_id).subscribe((book) => {
            book[0].quantity = item.quantity;
            this.books.push(book[0]);
          });
        });
      });
    });
  }

  deleteClick(target) {
    if (target.innerText == 'Cancel Order') {
      target.textContent = 'Confirm';
      return;
    }
    this.orderService.deleteOrder(this.order).subscribe(() => {
      this.router.navigate(['orders'], { replaceUrl: true });
    });
  }

  timeFormat(date: string): string {
    return new Date(date).toDateString().toString();
  }
}
