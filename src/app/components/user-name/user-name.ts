import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUser, selectLoading } from '../../store/selectors/user.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.html',
  styleUrls: ['./user-name.scss'],
  imports: [CommonModule],
  standalone: true
})
export class UserNameComponent {
  selectedUser$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.loading$ = this.store.select(selectLoading);
  }
}