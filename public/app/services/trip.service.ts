import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { Trip, Trips } from '../models/trip.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsApiUrl = 'api/money-management/trips';

  constructor(
    private http: HttpClient
  ) { }

  saveTrip(trip: Trip): Observable<Trips> {
    this.http.post<Trip>(this.tripsApiUrl, trip, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
      .pipe(
        tap(result => this.log(`save trip ${result}`)),
        catchError(this.handleError('save trip', null))
      );
    return this.getTrips();
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
        catchError(this.handleError('getTrips', []))
      );
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
