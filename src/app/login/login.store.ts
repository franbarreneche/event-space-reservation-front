import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';
import { LoginService } from './login.service';
import { ToastNotificationService } from '../shared/toast-notification.service';
import { Router } from '@angular/router';

interface State {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

@Injectable()
export class LoginStore extends ComponentStore<State> {
  constructor(
    private readonly loginService: LoginService,
    private readonly toastService: ToastNotificationService,
    private readonly router: Router,
  ) {
    super(initialState);
  }

  // Selectors
  private readonly isLoading$ = this.select<boolean>(
    (state) => state.isLoading,
  );

  readonly vm$ = this.select(this.isLoading$, (isLoading) => ({ isLoading }));

  // Updaters
  private readonly updateIsLoading = this.updater<boolean>(
    (state, isLoading) => ({ ...state, isLoading }),
  );

  // Effects
  readonly login = this.effect<{ email: string; password: string }>((form$) =>
    form$.pipe(
      tap(() => this.updateIsLoading(true)),
      switchMap((form) =>
        this.loginService.login(form as any).pipe(
          tap((data) => {
            this.toastService.showSuccess('Login Successful!');
            this.router.navigate(['/dashboard']);
          }),
          catchError((err) => this.handleError(err)),
          finalize(() => this.updateIsLoading(false)),
        ),
      ),
    ),
  );

  // Helpers
  private handleError(err: any) {
    this.toastService.showError('Authentication failed');
    return EMPTY;
  }
}
