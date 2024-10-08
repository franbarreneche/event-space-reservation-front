import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Space } from './space';

@Component({
  selector: 'app-home-card-ui',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card appearance="outlined" style="width: 300px;">
      <div class="venue-image">
        @if (space() && (space()?.images)!.length > 0) {
          <img [src]="space()!.images[0]!" alt="Space main image" />
        } @else {
          <img
            src="https://placehold.co/400x200?text=No+Image&font=roboto"
            alt="Filler image"
          />
        }
      </div>
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>{{ space()?.name }}</mat-card-title>
          <mat-card-subtitle
            >Capacity: {{ space()?.capacity }}</mat-card-subtitle
          >
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p>Address: {{ space()?.address }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="onView.emit(space()!)">View</button>
        <button mat-button (click)="onBook.emit(space()!)">Book</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    mat-card {
      display: flex;
      flex-direction: column;
    }
    mat-card-content {
      font-size: 14px;
    }
    .venue-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .venue-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `,
})
export class HomeCardUiComponent {
  space = input<Space | null>(null);
  onView = output<Space>();
  onBook = output<Space>();
}
