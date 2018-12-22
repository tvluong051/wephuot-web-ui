import { Action } from '@ngrx/store';
import { TripActionType, TripFetchTripDetailSuccessAction, TripFetchTripsSuccessAction } from '../actions/trip.action';
import { Trips } from '../../../models/trip.model';

export function reducer(tripsState: Trips = [], action: Action) {
  switch (action.type) {
    case TripActionType.TRIP_FETCH_TRIPS_SUCCESS:
      const ftsa = action as TripFetchTripsSuccessAction;

      tripsState = [...ftsa.payload.trips];
      break;

    case TripActionType.TRIP_FETCH_TRIP_DETAIL_SUCCESS:
      const ftdsa = action as TripFetchTripDetailSuccessAction;
      const updatedTrip = ftdsa.payload.trip;

      tripsState = tripsState.filter(trip => trip.tripId !== updatedTrip.tripId);
      tripsState.push(updatedTrip);
      break;
  }
  return tripsState;
}
