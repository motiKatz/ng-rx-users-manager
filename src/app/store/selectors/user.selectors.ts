import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersAdapter } from '../reducers/user.reducer';
import { UserSummary } from '../../models/user.model';

export const selectUsersState = createFeatureSelector<UsersState>('users');

// Entity selectors
export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectIds: selectUserIds,
  selectTotal: selectUsersTotal
} = usersAdapter.getSelectors(selectUsersState);

// Custom selectors
export const selectSelectedUserId = createSelector(
  selectUsersState,
  (state) => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (userEntities, selectedId) => selectedId ? userEntities[selectedId] || null : null
);

export const selectUserOrders = createSelector(
  selectUsersState,
  (state) => state.orders
);

export const selectSelectedUserOrders = createSelector(
  selectSelectedUserId,
  selectUserOrders,
  (selectedId, orders) => selectedId ? orders.filter(order => order.userId === selectedId) : []
);

export const selectUserSummary = createSelector(
  selectSelectedUser,
  selectSelectedUserOrders,
  (selectedUser, orders): UserSummary | null => {
    if (!selectedUser) return null;
    
    const totalOrdersAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    
    return {
      userName: selectedUser.name,
      totalOrdersAmount
    };
  }
);

export const selectLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectLoadingUserDetails = createSelector(
  selectUsersState,
  (state) => state.loadingUserDetails
);

export const selectError = createSelector(
  selectUsersState,
  (state) => state.error
);
