import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        MainLayoutComponent,
    ],
    exports: [
        MainLayoutComponent
    ],
    imports: [
        MatSidenavModule,
        SidebarModule,
        RouterModule
    ]
})
export class CustomLayoutsModule {}
