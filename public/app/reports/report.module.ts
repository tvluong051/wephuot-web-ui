import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { ReportEffects } from './store/effects/report.effects';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        StoreModule.forFeature('reports', reducers),
        EffectsModule.forFeature([ReportEffects])
    ]
})

export class ReportModule {}
