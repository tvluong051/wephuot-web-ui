import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpendingActionType,
  TripFetchSpendingsAction,
  TripFetchSpendingsSuccessAction,
  TripFetchSpendingsErrorAction
} from '../actions/spending.action';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Spendings } from 'public/app/models/spending.model';

@Injectable()
export class SpendingEffects {
    private readonly spendingsApiUrl = 'api/money-management/spendings';

    constructor(private httpClient: HttpClient, private actions$: Actions) {}

    @Effect()
    fetchSpendings$: Observable<Action> = this.actions$.pipe(
        ofType(SpendingActionType.TRIP_FETCH_SPENDINGS),
        switchMap((action: TripFetchSpendingsAction) =>
        this.httpClient.get(this.spendingsApiUrl, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            params: {
              tripId: action.payload.tripId
            }
          }).pipe(
              tap(() => console.log(`Fetch spendings for tripId = ${action.payload.tripId}`)),
              map(spendings => new TripFetchSpendingsSuccessAction({
                  tripId: action.payload.tripId,
                  spendings: spendings as Spendings
              })),
              catchError(() => of(new TripFetchSpendingsErrorAction()))
          )
        )
    );
}
