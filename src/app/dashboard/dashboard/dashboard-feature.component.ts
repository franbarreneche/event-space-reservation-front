import { Component, inject } from '@angular/core';
import { LayoutUiComponent } from './layout-ui.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutUiComponent, RouterOutlet, AsyncPipe],
  template: `
    @if(userInformation$ | async; as userInformation) {
      <app-layout [userName]="userInformation.name" [userIsAdmin]="userInformation.is_admin">
        <router-outlet />
      </app-layout>
    }
  `,
  styles: ``,
})
export class DashboardFeatureComponent {
  userInformation$ : Observable<{name: string, is_admin: boolean}> = inject(ActivatedRoute).data.pipe(map(data => data['userInformation']));
}
