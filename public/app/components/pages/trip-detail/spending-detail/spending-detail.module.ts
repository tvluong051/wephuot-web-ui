import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { SpendingDetailComponent } from './spending-detail.component';
import { ConfirmDialogModule } from '../../../commons/confirm-dialog/confirm-dialog.module';



@NgModule({
  declarations: [
    SpendingDetailComponent
  ],
  imports: [
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    SpendingDetailComponent
  ]
})

export class SpendingDetailModule { }
