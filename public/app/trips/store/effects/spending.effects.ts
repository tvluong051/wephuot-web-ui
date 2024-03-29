import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpendingActionType,
  TripFetchSpendingsAction,
  TripFetchSpendingsSuccessAction,
  TripFetchSpendingsErrorAction,
  TripAddSpendingAction,
  TripAddSpendingSuccessAction,
  TripAddSpendingErrorAction,
  TripUpdateSpendingAction,
  TripUpdateSpendingSuccessAction,
  TripUpdateSpendingErrorAction,
  TripDeleteSpendingAction,
  TripDeleteSpendingSuccessAction,
  TripDeleteSpendingErrorAction
} from '../actions/spending.action';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Spendings, Spending } from 'public/app/models/spending.model';

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
                params: { tripId: action.payload.tripId }
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

    @Effect()
    addSpending$: Observable<Action> = this.actions$.pipe(
        ofType(SpendingActionType.TRIP_ADD_SPENDING),
        switchMap((action: TripAddSpendingAction) =>
            this.httpClient.post(`${this.spendingsApiUrl}/spending`, {
                description: action.payload.spending.description,
                amount: action.payload.spending.amount,
                spentDate: action.payload.spending.spentDate,
                crediter: action.payload.spending.crediter.userId,
                equallyDivided: action.payload.spending.equallyDivided,
                shareparts: action.payload.spending.shareparts
            },
            {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                params: { tripId: action.payload.tripId }
            }).pipe(
                tap(() => console.log(`Add new spending for tripId = ${action.payload.tripId}`)),
                map(spending => new TripAddSpendingSuccessAction({
                    tripId: action.payload.tripId,
                    spending: spending as Spending
                })),
                catchError(() => of(new TripAddSpendingErrorAction()))
            )
        )
    );

    @Effect()
    saveSpending$: Observable<Action> = this.actions$.pipe(
        ofType(SpendingActionType.TRIP_UPDATE_SPENDING),
        switchMap((action: TripUpdateSpendingAction) =>
            this.httpClient.put(`${this.spendingsApiUrl}/spending/${action.payload.spending.id}`, {
                id: action.payload.spending.id,
                description: action.payload.spending.description,
                amount: action.payload.spending.amount,
                spentDate: action.payload.spending.spentDate,
                crediter: action.payload.spending.crediter.userId,
                equallyDivided: action.payload.spending.equallyDivided,
                shareparts: action.payload.spending.shareparts
            },
            {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log(`Update spending id = ${action.payload.spending.id}`)),
                map(spending => new TripUpdateSpendingSuccessAction({
                    tripId: action.payload.tripId,
                    spending: spending as Spending
                })),
                catchError(() => of(new TripUpdateSpendingErrorAction()))
            )
        )
    );

    @Effect()
    deleteSpending$: Observable<Action> = this.actions$.pipe(
        ofType(SpendingActionType.TRIP_DELETE_SPENDING),
        switchMap((action: TripDeleteSpendingAction) =>
            this.httpClient.delete(`${this.spendingsApiUrl}/spending/${action.payload.spendingId}`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log(`Delete spending id = ${action.payload.spendingId}`)),
                map(() => new TripDeleteSpendingSuccessAction(action.payload)),
                catchError(() => of(new TripDeleteSpendingErrorAction()))
            )
        )
    );
}
