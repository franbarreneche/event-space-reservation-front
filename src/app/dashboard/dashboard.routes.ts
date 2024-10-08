import { Routes } from '@angular/router';
import { HomeFeatureComponent } from './home/home-feature.component';
import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { SpaceManagementComponent } from './space-management/space-management.component';
import { DashboardFeatureComponent } from './dashboard/dashboard-feature.component';
import { userInformationResolver } from './dashboard/user-information.resolver';

export const routes: Routes = [
  {
    path: '',
    component: DashboardFeatureComponent,
    resolve: { userInformation: userInformationResolver},
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeFeatureComponent,
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
