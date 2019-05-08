import { NgModule } from '@angular/core';

import { DashboardModule } from './components/pages/dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
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
import { TripReportModule } from './components/pages/trip-report/trip-report.module';
import { TripReportComponent } from './components/pages/trip-report/trip-report.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginModule } from './components/pages/login/login.module';
import { MainLayoutComponent } from './components/commons/_layouts/main-layout/main-layout.component';
import { CustomLayoutsModule } from './components/commons/_layouts/layouts.module';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'},
      {
        path: 'trip/:tripId',
        component: TripDetailComponent
      },
      {
        path: 'report/:tripId',
        component: TripReportComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DashboardModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CustomLayoutsModule,
    LoginModule,
    StoreDevtoolsModule.instrument({
      maxAge: 250 // Retains last 25 states
    }),
    TripModule,
    TripAddDialogModule,
    TripDetailModule,
    TripReportModule,
    UserModule
  ],
  entryComponents: [
    TripAddDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
