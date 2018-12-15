import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  TripActionType, TripFetchTripDetailAction, TripFetchTripDetailErrorAction, TripFetchTripDetailSuccessAction,
  TripFetchTripsAction,
  TripFetchTripsErrorAction,
  TripFetchTripsSuccessAction,
  TripAddParticipantsAction,
  TripAddParticipantsErrorAction,
  TripSaveTripAction,
  TripValidateTripAction,
  TripValidateTripErrorAction,
  TripSaveTripErrorAction
} from '../actions/trip.action';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';
import { Trip, Trips } from '../../../models/trip.model';
import * as url from 'url';

@Injectable()
export class TripEffects {
  private readonly tripsApiUrl = 'api/money-management/trips';

  constructor(private httpClient: HttpClient, private actions$: Actions) {}

  @Effect()
  fetchTrips$: Observable<Action> = this.actions$.pipe(
    ofType(TripActionType.TRIP_FETCH_TRIPS),
    mergeMap((action: TripFetchTripsAction) =>
      this.httpClient.get(this.tripsApiUrl, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: {
          userId: action.payload.userId
        }
      }).pipe(
        tap(() => console.log('Fetched trips')),
        map(result => {
          const trips = result as Trips;

          return new TripFetchTripsSuccessAction({
            trips: trips.map(trip => this.buildTripCoverUrl(trip))
          });
        }),
        catchError(() => of(new TripFetchTripsErrorAction()))
      )
    )
  );

  @Effect()
  fetchTripDetail$: Observable<Action> = this.actions$.pipe(
    ofType(TripActionType.TRIP_FETCH_TRIP_DETAIL),
    mergeMap((action: TripFetchTripDetailAction) =>
      this.httpClient.get(`${this.tripsApiUrl}/trip/${action.payload.tripId}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        tap(() => console.log(`Fetched trip id = ${action.payload.tripId}`)),
        map(trip => new TripFetchTripDetailSuccessAction({
            trip: this.buildTripCoverUrl(trip as Trip)
        })),
        catchError(() => of(new TripFetchTripDetailErrorAction()))
      )
    )
  );

  @Effect()
  saveTrip$: Observable<Action> = this.actions$.pipe(
    ofType(TripActionType.TRIP_SAVE_TRIP),
    mergeMap((action: TripSaveTripAction) =>
      this.httpClient.post(`${this.tripsApiUrl}/trip`, action.payload.trip, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json'
      }).pipe(
        tap(tripId => console.log(`Save trip id = ${tripId}`)),
        map(result => {
          const tripId = result as string;

          if (action.payload.users.length > 0) {
            return new TripAddParticipantsAction({
              tripId: tripId,
              users: action.payload.users,
              validate: action.payload.validate
            });
          } else if (action.payload.validate) {
            return new TripValidateTripAction({tripId: tripId});
          }
          return new TripFetchTripDetailAction({tripId: tripId});
        }),
        catchError(() => of(new TripSaveTripErrorAction()))
      )
    )
  );

  @Effect()
  addParticipants$: Observable<Action> = this.actions$.pipe(
    ofType(TripActionType.TRIP_ADD_PARTICIPANTS),
    mergeMap((action: TripAddParticipantsAction) =>
      this.httpClient.post(`${this.tripsApiUrl}/trip/${action.payload.tripId}/participants`, action.payload.users, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json'
      }).pipe(
        tap(() => console.log(`Add participants to trip id = ${action.payload.tripId}`)),
        map(result => {
          const tripId = result as string;

          if (action.payload.validate) {
            return new TripValidateTripAction({tripId: tripId});
          }
          return new TripFetchTripDetailAction({tripId: tripId});
        }),
        catchError(() => of(new TripAddParticipantsErrorAction(), new TripFetchTripDetailAction({tripId: action.payload.tripId})))
      )
    )
  );

  @Effect()
  validateTrip$: Observable<Action> = this.actions$.pipe(
    ofType(TripActionType.TRIP_VALIDATE_TRIP),
    mergeMap((action: TripValidateTripAction) =>
      this.httpClient.put(`${this.tripsApiUrl}/trip/${action.payload.tripId}`, null, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json'
      }).pipe(
        tap(() => console.log(`Validated trip id = ${action.payload.tripId}`)),
        map(tripId => new TripFetchTripDetailAction({tripId: tripId as string})),
        catchError(() => of(new TripValidateTripErrorAction(), new TripFetchTripDetailAction({tripId: action.payload.tripId})))
      )
    )
  );

  private buildTripCoverUrl(trip: Trip): Trip {
    if (trip.coverPhoto) {
      const coverPhotoUrl = url.parse(trip.coverPhoto);

      trip.coverPhoto = coverPhotoUrl.protocol && coverPhotoUrl.host ? trip.coverPhoto : '/staticFile' + trip.coverPhoto;
    }
    return trip;
  }

}
