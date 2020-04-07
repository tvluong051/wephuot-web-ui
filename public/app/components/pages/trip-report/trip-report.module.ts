import { NgModule } from '@angular/core';
import { TripReportComponent } from './trip-report.component';
import { RouterModule } from '@angular/router';
import { ReportModule } from 'public/app/reports/report.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
