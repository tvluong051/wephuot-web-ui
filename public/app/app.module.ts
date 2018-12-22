import { NgModule } from '@angular/core';

import { DashboardModule } from './components/pages/dashboard/dashboard.module';
import { MatSidenavModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from './components/commons/sidebar/sidebar.module';
import { StoreModule } from '@ngrx/store';
import { TripAddDialogModule } from './components/commons/trip-add-dialog/trip-add-dialog.module';
import { TripDetailModule } from './components/pages/trip-detail/trip-detail.module';

import { AppComponent } from './app.component';
import { TripAddDialogComponent } from './components/commons/trip-add-dialog/trip-add-dialog.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TripDetailComponent } from './components/pages/trip-detail/trip-detail.component';
import { TripModule } from './trips/trip.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModule } from './users/user.module';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'trip/:tripId',
    component: TripDetailComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DashboardModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    SidebarModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 250 // Retains last 25 states
    }),
    TripModule,
    TripAddDialogModule,
    TripDetailModule,
    UserModule
  ],
  entryComponents: [
    TripAddDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
