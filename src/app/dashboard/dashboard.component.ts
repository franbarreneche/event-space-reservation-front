import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: ``,
})
export class DashboardComponent {}
