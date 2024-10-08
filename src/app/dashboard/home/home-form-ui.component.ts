import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-home-form-ui',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="filterForm" novalidate (ngSubmit)="onSubmit()">
      <div
        style="display: flex; flex-wrap: wrap; justify-content: start; gap: 0.5rem; margin-bottom: 1rem;"
      >
        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <input matInput placeholder="Venue type" formControlName="type" />
          @if (filterForm.controls['type'].hasError('required')) {
            <mat-error>Type is <strong>required</strong></mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Min seating capacity</mat-label>
          <input
            matInput
            type="number"
            placeholder="Minimum required capacity"
            formControlName="capacity"
          />
          @if (filterForm.controls['capacity'].hasError('required')) {
            <mat-error>Capacity is <strong>required</strong></mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Enter a date range</mat-label>
          <mat-date-range-input [rangePicker]="picker">
            <input
              matStartDate
              formControlName="dateFrom"
              placeholder="Start date"
            />
            <input matEndDate formControlName="dateTo" placeholder="End date" />
          </mat-date-range-input>
          <mat-datepicker-toggle
            matIconSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-date-range-picker #picker></mat-date-range-picker>

          @if (filterForm.controls.dateFrom.hasError('matStartDateInvalid')) {
            <mat-error>Invalid start date</mat-error>
          }
          @if (filterForm.controls.dateTo.hasError('matEndDateInvalid')) {
            <mat-error>Invalid end date</mat-error>
          }
        </mat-form-field>
        <div [style.flex-grow]="1"></div>
        <button mat-flat-button type="submit" [disabled]="filterForm.invalid">
          Filter
        </button>
      </div>
    </form>
  `,
  styles: ``,
})
export class HomeFormUiComponent {
  protected fb = inject(FormBuilder);
  onFilter = output<object>();

  protected filterForm = this.fb.nonNullable.group({
    type: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(0)]],
    dateFrom: new FormControl<Date | null>(null, Validators.required),
    dateTo: new FormControl<Date | null>(null, Validators.required),
  });

  onSubmit() {
    this.onFilter.emit(this.filterForm.getRawValue());
  }
}
