import { NgModule } from '@angular/core';

import { DashboardModule } from './components/pages/dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from './components/commons/sidebar/sidebar.module';
import { TripAddDialogModule } from './components/commons/trip-add-dialog/trip-add-dialog.module';
import { TripDetailModule } from './components/pages/trip-detail/trip-detail.module';

import { AppComponent } from './app.component';
import { TripAddDialogComponent } from './components/commons/trip-add-dialog/trip-add-dialog.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { TripDetailComponent } from './components/pages/trip-detail/trip-detail.component';


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
    HttpClientModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    SidebarModule,
    TripAddDialogModule,
    TripDetailModule
  ],
  entryComponents: [
    TripAddDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
