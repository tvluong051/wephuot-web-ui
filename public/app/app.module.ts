import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatStepperModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

import { SidebarComponent } from './components/commons/sidebar/sidebar.component';
import { TripAddDialogComponent } from './components/commons/trip-add-dialog/trip-add-dialog.component';
import { TripDetailComponent } from './components/pages/trip-detail/trip-detail.component';
import { ImageCropperModule } from 'ngx-image-cropper';

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
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    TripAddDialogComponent,
    TripDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatStepperModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    TripAddDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
