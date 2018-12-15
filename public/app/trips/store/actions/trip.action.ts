import { Action } from '@ngrx/store';
import { Trips, Trip } from 'public/app/models/trip.model';
import { Users } from 'public/app/models/user.model';

export enum TripActionType {
  TRIP_FETCH_TRIPS = '[Trip] TRIP_FETCH_TRIPS',
  TRIP_FETCH_TRIPS_SUCCESS = '[Trip] TRIP_FETCH_TRIPS_SUCCESS',
  TRIP_FETCH_TRIPS_ERROR = '[Trip] TRIP_FETCH_TRIPS_ERROR',
  TRIP_ADD_PARTICIPANTS = '[Trip] TRIP_ADD_PARTICIPANTS',
  TRIP_ADD_PARTICIPANTS_ERROR = '[Trip] TRIP_ADD_PARTICIPANTS_ERROR',
  TRIP_FETCH_TRIP_DETAIL = '[Trip] TRIP_FETCH_TRIP_DETAIL',
  TRIP_FETCH_TRIP_DETAIL_SUCCESS = '[Trip] TRIP_FETCH_TRIP_DETAIL_SUCCESS',
  TRIP_FETCH_TRIP_DETAIL_ERROR = '[Trip] TRIP_FETCH_TRIP_DETAIL_ERROR',
  TRIP_SAVE_TRIP = '[Trip] TRIP_SAVE_TRIP',
  TRIP_SAVE_TRIP_ERROR = '[Trip] TRIP_SAVE_TRIP_ERROR',
  TRIP_VALIDATE_TRIP = '[Trip] TRIP_VALIDATE_TRIP',
  TRIP_VALIDATE_TRIP_ERROR = '[Trip] TRIP_VALIDATE_TRIP_ERROR'
}

export class TripFetchTripsAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIPS;

  constructor(public payload: {userId: string}) {}
}

export class TripFetchTripsSuccessAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIPS_SUCCESS;

  constructor(public payload: {trips: Trips}) {}
}

export class TripFetchTripsErrorAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIPS_ERROR;
}


export class TripFetchTripDetailAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIP_DETAIL;

  constructor(public payload: {tripId: string}) {}
}

export class TripFetchTripDetailSuccessAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIP_DETAIL_SUCCESS;

  constructor(public payload: {trip: Trip}) {}
}

export class TripFetchTripDetailErrorAction implements Action {
  readonly type = TripActionType.TRIP_FETCH_TRIP_DETAIL_ERROR;
}


export class TripSaveTripAction implements Action {
  readonly type = TripActionType.TRIP_SAVE_TRIP;

  constructor(public payload: {trip: Trip, users: Users, validate: boolean}) {}
}

export class TripSaveTripErrorAction implements Action {
  readonly type = TripActionType.TRIP_SAVE_TRIP_ERROR;
}


export class TripAddParticipantsAction implements Action {
  readonly type = TripActionType.TRIP_ADD_PARTICIPANTS;

  constructor(public payload: {tripId: string, users: Users, validate: boolean}) {}
}

export class TripAddParticipantsErrorAction implements Action {
  readonly type = TripActionType.TRIP_ADD_PARTICIPANTS_ERROR;
}


export class TripValidateTripAction implements Action {
  readonly type = TripActionType.TRIP_VALIDATE_TRIP;

  constructor(public payload: {tripId: string}) {}
}

export class TripValidateTripErrorAction implements Action {
  readonly type = TripActionType.TRIP_VALIDATE_TRIP_ERROR;
}
