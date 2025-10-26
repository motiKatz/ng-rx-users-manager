import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSummary } from '../../models/user.model';
import { UserNameComponent } from '../user-name/user-name';
import { OrdersTotalComponent } from '../orders-total/orders-total';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.scss'],
  imports: [CommonModule, UserNameComponent, OrdersTotalComponent],
  standalone: true
})
export class UserDetailsComponent {
  userSummary = input<UserSummary | null>(null);
  loading = input<boolean>(false);
}
