import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.html',
  styleUrls: ['./user-selection.scss'],
  imports: [CommonModule],
  standalone: true
})
export class UserSelectionComponent {
  users = input<User[]>([]);
  loading = input<boolean>(false);

  userSelected = output<number>();
  userEditRequested = output<User>();
  userDeleteRequested = output<User>();
  addUserRequested = output<void>();
  clearSelectionRequested = output<void>();

  onSelectUser(userId: number): void {
    this.userSelected.emit(userId);
  }

  onEditUser(user: User): void {
    this.userEditRequested.emit(user);
  }

  onDeleteUser(user: User): void {
    this.userDeleteRequested.emit(user);
  }

  onAddUser(): void {
    this.addUserRequested.emit();
  }

  onClearSelection(): void {
    this.clearSelectionRequested.emit();
  }
}
