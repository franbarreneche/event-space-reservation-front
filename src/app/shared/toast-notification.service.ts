import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private readonly toast: MatSnackBar) {}

  showError(message: string): void {
    this.toast.open(message, 'Close', { duration: 4000 });
  }

  showSuccess(message: string): void {
    this.toast.open(message, 'Close', { duration: 4000 });
  }
}
