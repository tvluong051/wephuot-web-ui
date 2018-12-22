import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { UserEffects } from './store/effects/user.effects';
import { reducers } from './store/reducers';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([UserEffects])
    ]
})

export class UserModule {}
