import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginStore } from './login.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginFormUiComponent } from './login-form-ui.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginFormUiComponent, NgOptimizedImage],
  providers: [LoginStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (vm$ | async; as vm) {
      <div
        style="display: flex; height: 100%; align-items: center; justify-content: center; background-color: rgba(215, 227, 255, 0.75)"
      >
        <div
          style="display: flex; flex-wrap: wrap; align-items: center; background-color: white"
        >
          <!-- FORM -->
          <app-login-form-ui
            [isLoading]="vm.isLoading"
            (formSubmit)="login($event)"
          />
          <!-- IMAGE -->
          <img
            ngSrc="https://material.angular.io/assets/img/examples/shiba2.jpg"
            alt="Photo of a Shiba Inu"
            height="600"
            width="750"
            priority
          />
        </div>
      </div>
    }
  `,
})
export class LoginFeatureComponent {
  private readonly store = inject(LoginStore);
  protected readonly vm$ = this.store.vm$;

  login(form: { email: string; password: string }): void {
    this.store.login(form);
  }
}
