import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeFormUiComponent } from './home-form-ui.component';
import { HomeCardUiComponent } from './home-card-ui.component';
import { SpaceService } from './space.service';
import { HomeStore } from './home.store';
import { CommonModule } from '@angular/common';
import { Space } from './space';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeFormUiComponent, HomeCardUiComponent],
  providers: [HomeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      style="margin: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;"
    >
      <h1 class="mat-h1">Home</h1>
      <app-home-form-ui (onFilter)="filter($event)" />
      <div
        style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem;"
      >
        @if (vm$ | async; as vm) {
          @for (space of vm; track space.id) {
            <app-home-card-ui
              [space]="space"
              (onBook)="book($event)"
              (onView)="view($event)"
            />
          }
        }
      </div>
    </div>
  `,
})
export class HomeFeatureComponent {
  protected vm$ = inject(SpaceService).searchSpaces(
    'a',
    1,
    new Date(),
    new Date(),
  );

  filter(form: any): void {
    alert('Filtering..' + JSON.stringify(form));
  }

  view(space: Space): void {
    alert('View Space' + JSON.stringify(space));
  }

  book(space: Space): void {
    alert('Book Space' + JSON.stringify(space));
  }
}
