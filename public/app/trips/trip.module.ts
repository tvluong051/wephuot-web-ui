import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TripEffects } from './store/effects/trip.effects';
import { SpendingEffects } from './store/effects/spending.effects';
import { reducers } from './store/reducers';


@NgModule({
  imports: [
    StoreModule.forFeature('trips', reducers),
    EffectsModule.forFeature([TripEffects, SpendingEffects])
  ],
  declarations: []
})
export class TripModule { }
