import { NgModule } from '@angular/core';
import { TripReportComponent } from './trip-report.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReportModule } from 'public/app/reports/report.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        TripReportComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        ReportModule,
        RouterModule
    ],
    exports: [
        TripReportComponent
    ]
})

export class TripReportModule {}
