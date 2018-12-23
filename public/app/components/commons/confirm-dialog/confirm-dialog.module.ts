import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule
    ],
    exports: [
        ConfirmDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})

export class ConfirmDialogModule {}
