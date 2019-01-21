import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    ReportActionType,
    ReportFetchTripReportAction,
    ReportFetchTripReportSuccessAction,
    ReportFetchTripReportErrorAction
} from '../actions/report.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ReportEffects {
    private reportApiUrl = 'api/money-management/reports';

    constructor(private httpClient: HttpClient, private actions$: Actions) {}

    @Effect()
    fetchReport$: Observable<Action> = this.actions$.pipe(
        ofType(ReportActionType.REPORT_FETCH_TRIP_REPORT),
        switchMap((action: ReportFetchTripReportAction) =>
            this.httpClient.get(`${this.reportApiUrl}/balance/${action.payload.tripId}`, {
                headers:  new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log(`Fetch report for trip id = ${action.payload.tripId}`)),
                map(result => new ReportFetchTripReportSuccessAction({tripId: action.payload.tripId, report: result as Map<string, any>})),
                catchError(() => of(new ReportFetchTripReportErrorAction()))
            )
        )
    );

}
