import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.html',
  styleUrls: ['./delete-confirmation-modal.scss'],
  imports: [CommonModule],
  standalone: true
})
export class DeleteConfirmationModalComponent {
  user = input<User | null>(null);
  isVisible = input<boolean>(false);
  confirm = output<number>();
  cancel = output<void>();

  onConfirm(): void {
    if (this.user()) {
      this.confirm.emit(this.user()!.id);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
