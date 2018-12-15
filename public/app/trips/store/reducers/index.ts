import { Trips } from '../../../models/trip.model';
import { Spendings } from '../../../models/spending.model';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrips from './trips.reducer';
import * as fromSpendings from './spendings.reducer';

export interface TripsState {
  userTrips: Trips;
  spendings: Map<string, Spendings>;
}


export const reducers: ActionReducerMap<any> = {
  userTrips: fromTrips.reducer,
  spendings: fromSpendings.reducer
};

export const getTripsState = createFeatureSelector<TripsState>('trips');

export const getUserTripsState = createSelector(
  getTripsState,
  (state: TripsState) => state.userTrips
);

export const getTripStateById = createSelector(
  getUserTripsState,
  (trips: Trips, props: {tripId: string}) => trips.find(trip => trip.tripId === props.tripId)
);

export const getSpendingsStateByTripId = createSelector(
  getTripsState,
  (state: TripsState, props: {tripId: string}) => state.spendings[props.tripId]
);

export const getParticipantsStateByTripId = createSelector(
  getUserTripsState,
  (trips: Trips, props: {tripId: string}) => trips.find(trip => trip.tripId === props.tripId).participants
);
