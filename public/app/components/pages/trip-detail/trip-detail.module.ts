import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SpendingsListModule } from './spendings-list/spendings-list.module';
import { TripDetailComponent } from './trip-detail.component';
import { AddSpendingBoxModule } from './add-spending-box/add-spending-box.module';


@NgModule({
  declarations: [
    TripDetailComponent
  ],
  imports: [
    AddSpendingBoxModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SpendingsListModule
  ],
  exports: [
    TripDetailComponent
  ]
})

export class TripDetailModule { }
