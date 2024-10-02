import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    ReactiveFormsModule,
  ],
  template: `
  <form [formGroup]="credentialsForm" novalidate (ngSubmit)="onSubmit()">
    <div style="display: flex">
      <!-- FORM -->
      <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; justify-content: center; background-color: white;">
        <h1>Login</h1>
        <mat-form-field appearance="outline" class="full-width">
          <mat-icon matPrefix>mail_outline</mat-icon>
          <input matInput type="text" placeholder="Email" formControlName="email">
          @if (credentialsForm.controls['email'].hasError('required')) {
            <mat-error>First name is <strong>required</strong></mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-icon matPrefix>lock_outline</mat-icon>
          <input matInput type="password" placeholder="Password" formControlName="password">
          @if (credentialsForm.controls['password'].hasError('required')) {
            <mat-error>First name is <strong>required</strong></mat-error>
          }
        </mat-form-field>
        <button mat-flat-button type="submit">Enter</button>
      </div>
      <!-- IMAGE -->
      <div>
      <img src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
      </div>
    </div>
  </form>
  `,
  styles: ``
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  credentialsForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    alert('Login...');
  }
}
