import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { reducer } from './reports.reducer';

export interface ReportsState {
    tripReports: Map<string, any>;
}

export const reducers: ActionReducerMap<any> = {
    tripReports: reducer
};

export const getReportsState = createFeatureSelector<ReportsState>('reports');

export const getReportByTripId = createSelector(
    getReportsState,
    (state: ReportsState, props: {tripId: string}) => state.tripReports[props.tripId]
);
