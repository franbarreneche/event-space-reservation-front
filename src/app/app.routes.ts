import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (c) => c.HomeComponent
      ),
      title: 'Home'
  },
  {
    path: 'reservations',
    loadComponent: () =>
      import('./features/reservation-management/reservation-management.component').then(
        (c) => c.ReservationManagementComponent
      ),
      title: 'Reservations'
  },
  {
    path: 'spaces',
    loadComponent: () =>
      import('./features/space-management/space-management.component').then(
        (c) => c.SpaceManagementComponent
      ),
      title: 'Spaces'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(
        (c) => c.LoginComponent
      ),
      title: 'Login'
  },
]
