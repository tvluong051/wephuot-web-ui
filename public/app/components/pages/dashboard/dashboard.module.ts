import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TripAddDialogModule } from '../../commons/trip-add-dialog/trip-add-dialog.module';
import { DashboardComponent } from './dashboard.component';
import { ConfirmDialogModule } from '../../commons/confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    ConfirmDialogModule,
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
