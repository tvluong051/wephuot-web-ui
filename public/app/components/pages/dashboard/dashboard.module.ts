import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TripAddDialogModule } from '../../commons/trip-add-dialog/trip-add-dialog.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule,
    TripAddDialogModule
  ],
  exports: [
    DashboardComponent
  ]
})

export class DashboardModule { }
