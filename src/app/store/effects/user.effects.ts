import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, takeUntil, tap, withLatestFrom, filter } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';
import { selectUsersState } from '../selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {
  private cancelUserDetailsSubject = new Subject<void>();
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);

  constructor() {}

  // Load Users Effect
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  // Load User Details Effect with cancellation
  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserDetails),
      tap(() => {
        // Cancel previous request
        this.cancelUserDetailsSubject.next();
      }),
      switchMap(({ userId }) => 
        this.userService.getUserDetails(userId).pipe(
          takeUntil(this.cancelUserDetailsSubject),
          map(({ user, orders }) => 
            UserActions.loadUserDetailsSuccess({ user, orders })
          ),
          catchError(error => of(UserActions.loadUserDetailsFailure({ error: error.message })))
        )
      )
    )
  );

  // Cancel User Details Effect
  cancelUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.cancelUserDetailsLoad),
      tap(() => {
        this.cancelUserDetailsSubject.next();
      })
    ),
    { dispatch: false }
  );

  // Auto-load user details when selected user changes
  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      withLatestFrom(this.store.select(selectUsersState)),
      filter(([{ id }, state]) => {
        // Load if:
        // 1. Different user selected, OR
        // 2. Same user but no orders loaded, OR  
        // 3. Same user but orders array is empty
        return state.selectedUserId !== id || 
               state.orders.length === 0 || 
               !state.orders.some(order => order.userId === id);
      }),
      map(([{ id }]) => UserActions.loadUserDetails({ userId: id }))
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map(updatedUser => UserActions.addUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.addUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(userId => UserActions.deleteUserSuccess({ id: userId })),
          catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.saveUser),
      switchMap(({ user }) =>
        this.userService.saveUser(user).pipe(
          map(savedUser => UserActions.saveUserSuccess({ user: savedUser })),
          catchError(error => of(UserActions.saveUserFailure({ error: error.message })))
        )
      )
    )
  );
}
