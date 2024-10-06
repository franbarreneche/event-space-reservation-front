import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form-ui',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatPrefix,
    MatProgressSpinner,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="credentialsForm" novalidate (ngSubmit)="onSubmit()">
      <div
        style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; justify-content: center; background-color: white;"
      >
        <h2>Login</h2>
        <mat-form-field appearance="outline" class="full-width">
          <mat-icon matPrefix>mail_outline</mat-icon>
          <input
            matInput
            type="text"
            placeholder="Email"
            formControlName="email"
          />
          @if (credentialsForm.controls['email'].hasError('required')) {
            <mat-error>Email is <strong>required</strong></mat-error>
          }
          @if (credentialsForm.controls['email'].hasError('email')) {
            <mat-error>Invalid email address <strong>format</strong></mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-icon matPrefix>lock_outline</mat-icon>
          <input
            matInput
            type="password"
            placeholder="Password"
            formControlName="password"
          />
          @if (credentialsForm.controls['password'].hasError('required')) {
            <mat-error>Password is <strong>required</strong></mat-error>
          }
        </mat-form-field>
        @if (isLoading()) {
          <button mat-flat-button type="submit" disabled>
            <mat-spinner [diameter]="30"></mat-spinner>
          </button>
        } @else if (!credentialsForm.valid) {
          <button mat-flat-button type="submit" disabled>Enter</button>
        } @else {
          <button mat-flat-button type="submit">Enter</button>
        }
      </div>
    </form>
  `,
  styles: ``,
})
export class LoginFormUiComponent {
  private readonly fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  formSubmit = output<{ email: string; password: string }>();

  credentialsForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.formSubmit.emit(this.credentialsForm.getRawValue());
  }
}
