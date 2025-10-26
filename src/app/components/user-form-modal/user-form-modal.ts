import { Component, OnInit, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

export type UserFormMode = 'add' | 'edit';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.html',
  styleUrls: ['./user-form-modal.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class UserFormModalComponent implements OnInit {
  // Inputs
  mode = input<UserFormMode>('add');
  user = input<User | null>(null);
  isVisible = input<boolean>(false);
  existingUsers = input<User[]>([]);

  save = output<User>();
  cancel = output<void>();

  userForm: FormGroup;
  duplicateWarning: string = '';

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\d\-\+\(\)\s]+$/)]]
    });

    // Effect to watch for visibility and mode changes
    effect(() => {
      if (this.isVisible()) {
        if (this.mode() === 'add') {
          this.resetForm();
        } else if (this.mode() === 'edit' && this.user()) {
          this.populateForm();
        }
      }
    });
  }

  ngOnInit(): void {
    // Listen to ID changes to check for duplicates (only in add mode)
    this.userForm.get('id')?.valueChanges.subscribe(id => {
      if (this.mode() === 'add') {
        this.checkForDuplicate(id);
      }
    });
  }

  get isAddMode(): boolean {
    return this.mode() === 'add';
  }

  get isEditMode(): boolean {
    return this.mode() === 'edit';
  }

  get modalTitle(): string {
    return this.isAddMode ? 'Add New User' : 'Edit User';
  }

  get saveButtonText(): string {
    if (this.isAddMode) {
      return this.duplicateWarning ? 'Update Existing User' : 'Add New User';
    }
    return 'Save Changes';
  }

  get isIdReadonly(): boolean {
    return this.isEditMode;
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.save.emit(userData);
      this.closeModal();
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.closeModal();
  }

  generateNextId(): void {
    if (this.existingUsers().length > 0) {
      const maxId = Math.max(...this.existingUsers().map(user => user.id));
      this.userForm.patchValue({ id: maxId + 1 });
    } else {
      this.userForm.patchValue({ id: 1 });
    }
  }

  getFormControl(controlName: string) {
    return this.userForm.get(controlName);
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.getFormControl(controlName);
    return !!(control && control.hasError(errorType) && control.touched);
  }

  private checkForDuplicate(id: number): void {
    if (id && this.existingUsers().length > 0) {
      const existingUser = this.existingUsers().find(user => user.id === id);
      if (existingUser) {
        this.duplicateWarning = `User with ID ${id} already exists (${existingUser.name}). This will update the existing user instead of creating a duplicate.`;
      } else {
        this.duplicateWarning = '';
      }
    } else {
      this.duplicateWarning = '';
    }
  }

  private populateForm(): void {
    if (this.user()) {
      this.userForm.patchValue({
        id: this.user()!.id,
        name: this.user()!.name,
        email: this.user()!.email,
        phone: this.user()!.phone || ''
      });
    }
  }

  private resetForm(): void {
    this.userForm.reset();
    this.duplicateWarning = '';
  }

  private closeModal(): void {
    this.userForm.reset();
    this.duplicateWarning = '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }
}
