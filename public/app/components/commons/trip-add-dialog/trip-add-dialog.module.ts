import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatStepperModule } from '@angular/material';
import { TripAddDialogComponent } from './trip-add-dialog.component';


@NgModule({
  declarations: [
    TripAddDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ImageCropperModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  exports: [
    TripAddDialogComponent
  ]
})
export class TripAddDialogModule { }
