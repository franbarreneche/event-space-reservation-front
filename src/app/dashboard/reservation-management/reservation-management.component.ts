import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [],
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Reservations (Va una tabla / lista)</h1>
    </div>
  `,
  styles: `
    .grid-container {
      margin: 20px;
    }
  `,
})
export class ReservationManagementComponent {}
