import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserSummary, User } from '../../models/user.model';
import { selectUserSummary, selectAllUsers, selectLoading, selectLoadingUserDetails } from '../../store/selectors/user.selectors';
import * as UserActions from '../../store/actions/user.actions';
import { UserSelectionComponent } from '../user-selection/user-selection';
import { UserDetailsComponent } from '../user-details/user-details';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.html',
  styleUrls: ['./user-orders.scss'],
  imports: [CommonModule, UserSelectionComponent, UserDetailsComponent, UserFormModalComponent, DeleteConfirmationModalComponent],
  standalone: true
})
export class UserOrdersComponent implements OnInit {
  userSummary$: Observable<UserSummary | null>;
  allUsers$: Observable<User[]>;
  loading$: Observable<boolean>;
  loadingUserDetails$: Observable<boolean>;
  
  // Modal states
  formModalVisible = false;
  formModalMode: 'add' | 'edit' = 'add';
  deleteModalVisible = false;
  userToEdit: User | null = null;
  userToDelete: User | null = null;
  allUsers: User[] = [];
  
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {
    this.userSummary$ = this.store.select(selectUserSummary);
    this.allUsers$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.loadingUserDetails$ = this.store.select(selectLoadingUserDetails);
  }

  ngOnInit(): void {
    // Load users when component initializes
    this.store.dispatch(UserActions.loadUsers());
    
    // Subscribe to users to keep local copy for duplicate checking
    this.allUsers$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      this.allUsers = users;
    });
  }

  // User selection event handlers
  onUserSelected(userId: number): void {
    this.store.dispatch(UserActions.selectUser({ id: userId }));
  }

  onUserEditRequested(user: User): void {
    this.userToEdit = user;
    this.formModalMode = 'edit';
    this.formModalVisible = true;
  }

  onUserDeleteRequested(user: User): void {
    this.userToDelete = user;
    this.deleteModalVisible = true;
  }

  onAddUserRequested(): void {
    this.userToEdit = null;
    this.formModalMode = 'add';
    this.formModalVisible = true;
  }

  onClearSelectionRequested(): void {
    this.store.dispatch(UserActions.clearSelectedUser());
  }

  onUserSaved(updatedUser: User): void {    
    this.store.dispatch(UserActions.saveUser({ user: updatedUser }));
    this.formModalVisible = false;
    this.userToEdit = null;
  }

  onFormCancelled(): void {
    this.formModalVisible = false;
    this.userToEdit = null;
  }

  // Modal event handlers

  onDeleteConfirmed(userId: number): void {
    this.store.dispatch(UserActions.deleteUser({ id: userId }));
    this.deleteModalVisible = false;
    this.userToDelete = null;
  }

  onDeleteCancelled(): void {
    this.deleteModalVisible = false;
    this.userToDelete = null;
  }
}