import { CanActivateFn, Router, RouterStateSnapshot, Routes, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./shared/auth.service";

const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated() || router.createUrlTree(['/login']);
}

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
      import('./dashboard/dashboard.routes').then(r => r.routes),
      title: 'Dashboard'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (c) => c.LoginComponent
      ),
      title: 'Login'
  },
  {
    path: '**',
    redirectTo: '/',
  },
]


