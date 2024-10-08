import { CanActivateFn, Router, Routes, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/auth.service';

const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated() || router.createUrlTree(['/login']);
};

const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return !authService.isAuthenticated() || router.createUrlTree(['/dashboard']);
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((r) => r.routes),
    title: 'Dashboard',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./login/login-feature.component').then(
        (c) => c.LoginFeatureComponent,
      ),
    title: 'Login',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
