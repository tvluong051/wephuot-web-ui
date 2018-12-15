import { Action } from '@ngrx/store';
import { TripActionType, TripFetchTripDetailSuccessAction, TripFetchTripsSuccessAction } from '../actions/trip.action';
import { Trips } from '../../../models/trip.model';

export function reducer(tripsState: Trips = [], action: Action) {
  switch (action.type) {
    case TripActionType.TRIP_FETCH_TRIPS_SUCCESS:
      const ftsa = action as TripFetchTripsSuccessAction;

      ftsa.payload.trips.sort((t1, t2) => t2.lastModified - t1.lastModified);
      return [...ftsa.payload.trips];

    case TripActionType.TRIP_FETCH_TRIP_DETAIL_SUCCESS:
      const ftdsa = action as TripFetchTripDetailSuccessAction;
      const updatedTrip = ftdsa.payload.trip;

      tripsState = tripsState.filter(trip => trip.tripId !== updatedTrip.tripId);
      tripsState.push(updatedTrip);
      tripsState.sort((t1, t2) => t2.lastModified - t1.lastModified);
      return tripsState;
  }
  return tripsState;
}
