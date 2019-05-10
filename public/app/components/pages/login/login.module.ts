import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        MatButtonModule
    ]
})

export class LoginModule {}
