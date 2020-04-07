import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SpendingsListModule } from './spendings-list/spendings-list.module';
import { TripDetailComponent } from './trip-detail.component';
import { AddSpendingBoxModule } from './add-spending-box/add-spending-box.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
