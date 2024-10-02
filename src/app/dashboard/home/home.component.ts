import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Home</h1>

      <!-- FILTER -->
      <form [formGroup]="addressForm" novalidate (ngSubmit)="onSubmit()">
      <mat-card class="shipping-card">
        <mat-card-header>
          <mat-card-title>Filter</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="row">
            <mat-form-field appearance="outline" class="full-width">
              <input matInput placeholder="Tipo de Espacio" formControlName="firstName">
              @if (addressForm.controls['firstName'].hasError('required')) {
                <mat-error>First name is <strong>required</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <input matInput placeholder="Capacidad Minima Requerida / O Cap. Redonda?" formControlName="firstName">
              @if (addressForm.controls['firstName'].hasError('required')) {
                <mat-error>First name is <strong>required</strong></mat-error>
              }
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <input matInput placeholder="Fecha Inicio - Fecha Fin" formControlName="firstName">
              @if (addressForm.controls['firstName'].hasError('required')) {
                <mat-error>First name is <strong>required</strong></mat-error>
              }
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-flat-button color="warn" type="submit">Submit</button>
        </mat-card-actions>
      </mat-card>
      </form>

      <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Results</mat-card-title>
        <mat-card-subtitle>a la lista de espacios "filtrados" se los puede ver y/o reservar. Creo que lo mejor es que las resrvas se vean como una lista y no ponerse a jeder los huevos con usar datetimepickers. Tambien creo que mejor no usar una card para esta seccion y en cambio usar una imagen que diga "filtrá y buscá" y que el resultado se muestre como cards con la imgen del espacio</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions align="end">
        <button mat-button>Learn More</button>
      </mat-card-actions>
    </mat-card>
    </div>
  `,
  styles: `
    .grid-container {
      margin: 20px;
    }
  `
})
export class HomeComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  onSubmit(): void {
    alert('Thanks!');
  }
}
