import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';

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
