import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpendingDetailModule } from '../spending-detail/spending-detail.module';
import { SpendingsListComponent } from './spendings-list.component';


@NgModule({
  declarations: [
    SpendingsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    SpendingDetailModule
  ],
  exports: [
    SpendingsListComponent
  ]
})

export class SpendingsListModule { }
