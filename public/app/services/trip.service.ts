import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { Trip, Trips } from '../models/trip.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { Users } from '../models/user.model';
import * as url from 'url';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsApiUrl = 'api/money-management/trips';

  constructor(
    private http: HttpClient
  ) { }

  saveTrip(trip: Trip): Promise<string> {
    return this.http.post<string>(`${this.tripsApiUrl}/trip`, trip, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    })
      .toPromise();
  }

  addParticipants(tripId: string, users: Users): Promise<string> {
    return this.http.post<string>(`${this.tripsApiUrl}/trip/${tripId}/participants`, users, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    })
      .toPromise();
  }

  validateTrip(tripId: string): Promise<any> {
    return this.http.put<string>(`${this.tripsApiUrl}/trip/${tripId}`, null, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    })
      .toPromise();
  }

  getTrips(): Observable<Trips> {
    return this.http.get<Trips>(this.tripsApiUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {
        userId: 'testId'
      }
    })
      .pipe(
        tap(trips => this.log('fetched trips')),
        map(trips => trips.map(trip => this.buildTripCoverUrl(trip))),
        catchError(this.handleError('getTrips', []))
      );
  }

  getTripDetail(tripId: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsApiUrl}/trip/${tripId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
      .pipe(
        tap(trip => this.log(`fetched trip id = ${tripId}`)),
        map(trip => this.buildTripCoverUrl(trip)),
        catchError(this.handleError('getTripDetail', null))
      );
  }

  private buildTripCoverUrl(trip: Trip): Trip {
    if (trip.coverPhoto) {
      const coverPhotoUrl = url.parse(trip.coverPhoto);

      trip.coverPhoto = coverPhotoUrl.protocol && coverPhotoUrl.host ? trip.coverPhoto : '/staticFile' + trip.coverPhoto;
    }
    return trip;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`TripService: ${message}`);
  }
}
