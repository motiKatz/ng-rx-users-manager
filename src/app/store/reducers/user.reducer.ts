import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User, Order } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
  orders: Order[];
  loading: boolean;
  loadingUserDetails: boolean;
  error: string | null;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name)
});

export const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
  orders: [],
  loading: false,
  loadingUserDetails: false,
  error: null
});

export const usersReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // User Management - Now handled by effects calling service
  on(UserActions.addUserSuccess, (state, { user }) => {
    // Update store with data from service
    const existingUser = state.entities[user.id];
    if (existingUser) {
      return usersAdapter.updateOne({ id: user.id, changes: user }, state);
    }
    return usersAdapter.addOne(user, state);
  }),
  on(UserActions.updateUserSuccess, (state, { user }) =>
    usersAdapter.updateOne({ id: user.id, changes: user }, state)
  ),
  on(UserActions.deleteUserSuccess, (state, { id }) =>
    usersAdapter.removeOne(id, state)
  ),
  on(UserActions.saveUserSuccess, (state, { user }) => {
    const existingUser = state.entities[user.id];
    if (existingUser) {
      return usersAdapter.updateOne({ id: user.id, changes: user }, state);
    }
    return usersAdapter.addOne(user, state);
  }),

  // Selected User
  on(UserActions.selectUser, (state, { id }) => ({
    ...state,
    selectedUserId: id
  })),
  on(UserActions.clearSelectedUser, (state) => ({
    ...state,
    selectedUserId: null,
    orders: []
  })),

  // User Details
  on(UserActions.loadUserDetails, (state) => ({
    ...state,
    loadingUserDetails: true,
    error: null
  })),
  on(UserActions.loadUserDetailsSuccess, (state, { user, orders }) => ({
    ...state,
    loadingUserDetails: false,
    error: null,
    orders
  })),
  on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    loadingUserDetails: false,
    error
  })),
  on(UserActions.cancelUserDetailsLoad, (state) => ({
    ...state,
    loadingUserDetails: false,
    error: null
  }))
);
