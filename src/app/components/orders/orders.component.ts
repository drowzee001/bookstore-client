import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faInfoCircle,
  faReceipt,
  faSpinner,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/Order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  currentUser: User;
  orders: Order[] = [];
  noOrders: boolean = false;
  loading: boolean = true;
  faInfo = faInfoCircle;
  faTrashAlt = faTrashAlt;
  faReceipt = faReceipt;
  faLoad = faSpinner;
  faCheck = faCheck;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      if ((orders.length == 0)) {
        this.noOrders = true;
      } else {
        orders.forEach((order) => {
          order.confirm = false;
          this.orders.push(order);
        });
      }
      this.loading = false;
    });
  }

  deleteClick(order: Order) {
    if (order.confirm == false) {
      order.confirm = true;
      return;
    }
    this.orderService
      .deleteOrder(order)
      .subscribe(
        () => (this.orders = this.orders.filter((o) => o.id !== order.id))
      );
  }

  timeFormat(date: string): string {
    return new Date(date).toDateString().toString();
  }
}
