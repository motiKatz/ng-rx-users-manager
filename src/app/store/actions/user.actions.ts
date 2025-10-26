import { createAction, props } from '@ngrx/store';
import { User, Order } from '../../models/user.model';

// Load Users Actions
export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

// User Management Actions
export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>()
);
export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const saveUser = createAction(
  '[Users] Save User',
  props<{ user: User }>()
);
export const saveUserSuccess = createAction(
  '[Users] Save User Success',
  props<{ user: User }>()
);
export const saveUserFailure = createAction(
  '[Users] Save User Failure',
  props<{ error: string }>()
);

// Selected User Actions
export const selectUser = createAction(
  '[Users] Select User',
  props<{ id: number }>()
);
export const clearSelectedUser = createAction('[Users] Clear Selected User');

// User Details Actions
export const loadUserDetails = createAction(
  '[Users] Load User Details',
  props<{ userId: number }>()
);
export const loadUserDetailsSuccess = createAction(
  '[Users] Load User Details Success',
  props<{ user: User; orders: Order[] }>()
);
export const loadUserDetailsFailure = createAction(
  '[Users] Load User Details Failure',
  props<{ error: string }>()
);
export const cancelUserDetailsLoad = createAction('[Users] Cancel User Details Load');
