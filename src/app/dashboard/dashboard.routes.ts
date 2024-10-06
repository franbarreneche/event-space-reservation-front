import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { SpaceManagementComponent } from './space-management/space-management.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'reservations',
        component: ReservationManagementComponent,
        title: 'Reservations',
      },
      {
        path: 'spaces',
        component: SpaceManagementComponent,
        title: 'Spaces',
      },
    ],
  },
];
