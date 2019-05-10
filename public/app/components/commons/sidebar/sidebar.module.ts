import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
