import { Component } from '@angular/core';

@Component({
  selector: 'app-space-management',
  standalone: true,
  imports: [],
  template: `
    <div class="grid-container">
      <h1 class="mat-h1">Spaces</h1>
    </div>
  `,
  styles: `
    .grid-container {
      margin: 20px;
    }
  `
})
export class SpaceManagementComponent {

}
