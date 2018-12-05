import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
