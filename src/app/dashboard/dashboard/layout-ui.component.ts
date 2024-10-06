import { Component, inject, input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar>Reservations App</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="home" #link1="routerLinkActive" routerLinkActive [activated]="link1.isActive">Home</a>
          <a mat-list-item routerLink="reservations" #link2="routerLinkActive" routerLinkActive [activated]="link2.isActive">Reservations</a>
          @if (userIsAdmin()) {
            <a mat-list-item routerLink="spaces" #link3="routerLinkActive" routerLinkActive [activated]="link3.isActive">Spaces</a>
          }
          <div style="flex: 1 1 auto;"></div>
          <button mat-button>
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          @if (isHandset$ | async) {
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()"
            >
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
          }
          <div style="flex: 1 1 auto;"></div>
          <!-- User Information -->
          <p>{{ userName() }}</p>
        </mat-toolbar>
        <!-- Add Content Here -->
        <div class="sidenav-scroll-wrapper">
          <div class="sidenav-content">
            <ng-content></ng-content>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 240px;
      padding: 0 8px;
      box-sizing: border-box;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    mat-sidenav-content {
      padding-right: 16px;
    }

    .sidenav-scroll-wrapper {
      height: calc(100dvh - 64px - 16px);
      overflow: auto;
      border-radius: 16px;
      box-sizing: border-box;
    }

    .sidenav-content {
      max-height: 100%;
      overflow-y: auto;
      padding: 16px;
      box-sizing: border-box;
      @media (pointer: fine) {
        &::-webkit-scrollbar {
          background-color: transparent;
          width: 8px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
        }
      }
    }

    @media (max-width: 959.98px) {
      mat-sidenav-content {
        padding-right: 8px;
        padding-left: 8px;
      }
      .sidenav-scroll-wrapper {
        height: calc(100dvh - 64px);
      }
      .sidenav-content {
        overflow-y: visible;
        padding: 8px;
      }
    }
  `,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
})
export class LayoutUiComponent {
  userName = input<string>('');
  userIsAdmin = input<boolean>(false);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
