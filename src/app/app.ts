import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserOrdersComponent } from './components/user-orders/user-orders';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserOrdersComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-rx-users-manager');
}
