import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserOrders, selectLoadingUserDetails } from '../../store/selectors/user.selectors';
import { Order } from '../../models/user.model';

@Component({
  selector: 'app-orders-total',
  templateUrl: './orders-total.html',
  styleUrls: ['./orders-total.scss'],
  imports: [CommonModule],
  standalone: true
})
export class OrdersTotalComponent {
  selectedUserOrders$: Observable<Order[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.selectedUserOrders$ = this.store.select(selectSelectedUserOrders);
    this.loading$ = this.store.select(selectLoadingUserDetails);
  }

  calculateTotal(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }
}