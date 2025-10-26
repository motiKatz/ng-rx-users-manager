import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, Order } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '444-555-6666' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '777-888-9999' }
  ];

  private mockOrders: Order[] = [
    { id: 1, userId: 1, amount: 150.50, date: '2024-01-15', description: 'Electronics Purchase' },
    { id: 2, userId: 1, amount: 75.25, date: '2024-01-20', description: 'Books Order' },
    { id: 3, userId: 2, amount: 200.00, date: '2024-01-18', description: 'Clothing Order' },
    { id: 4, userId: 2, amount: 50.75, date: '2024-01-25', description: 'Accessories' },
    { id: 5, userId: 3, amount: 300.00, date: '2024-01-22', description: 'Home Decor' },
    { id: 6, userId: 4, amount: 125.50, date: '2024-01-28', description: 'Sports Equipment' },
    { id: 7, userId: 5, amount: 80.00, date: '2024-01-30', description: 'Garden Tools' },
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    // Simulate API call with delay
    return of(this.mockUsers).pipe(delay(1000));
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user).pipe(delay(500));
  }

  getUserOrders(userId: number): Observable<Order[]> {
    const orders = this.mockOrders.filter(order => order.userId === userId);
    return of(orders).pipe(delay(800));
  }

  getUserDetails(userId: number): Observable<{ user: User; orders: Order[] }> {
    const user = this.mockUsers.find(u => u.id === userId);
    const orders = this.mockOrders.filter(order => order.userId === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return of({ user, orders }).pipe(delay(1200));
  }

  addUser(user: User): Observable<User> {
    // Check if user already exists
    const existingUserIndex = this.mockUsers.findIndex(u => u.id === user.id);
    
    if (existingUserIndex !== -1) {
      this.mockUsers = this.mockUsers.map((u, index) => 
        index === existingUserIndex ? { ...user } : u
      );
    } else {
      this.mockUsers = [...this.mockUsers, { ...user }];
    }
    
    return of({ ...user }).pipe(delay(500));
  }

  updateUser(user: User): Observable<User> {
    const userIndex = this.mockUsers.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    this.mockUsers = this.mockUsers.map((u, index) => 
      index === userIndex ? { ...user } : u
    );
    
    return of({ ...user }).pipe(delay(500));
  }

  deleteUser(userId: number): Observable<number> {
    const userIndex = this.mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    this.mockUsers = this.mockUsers.filter(u => u.id !== userId);
    
    return of(userId).pipe(delay(500));
  }

  saveUser(user: User): Observable<User> {
    const existingUserIndex = this.mockUsers.findIndex(u => u.id === user.id);
    
    if (existingUserIndex !== -1) {
      this.mockUsers = this.mockUsers.map((u, index) => 
        index === existingUserIndex ? { ...user } : u
      );
    } else {
      this.mockUsers = [...this.mockUsers, { ...user }];
    }
    
    return of({ ...user }).pipe(delay(500));
  }
}
