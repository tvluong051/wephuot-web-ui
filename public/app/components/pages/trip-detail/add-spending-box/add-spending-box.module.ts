import { NgModule } from '@angular/core';
import { AddSpendingBoxComponent } from './add-spending-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
    declarations: [
        AddSpendingBoxComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    exports: [
        AddSpendingBoxComponent
    ]
})

export class AddSpendingBoxModule {}
