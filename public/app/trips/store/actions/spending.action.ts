import { Action } from '@ngrx/store';
import { Spendings } from 'public/app/models/spending.model';

export enum SpendingActionType {
    TRIP_FETCH_SPENDINGS = '[Trip] TRIP_FETCH_SPENDINGS',

    TRIP_FETCH_SPENDINGS_SUCCESS = '[Trip] TRIP_FETCH_SPENDINGS_SUCCESS',

    TRIP_FETCH_SPENDINGS_ERROR = '[Trip] TRIP_FETCH_SPENDINGS_ERROR',
}

export class TripFetchSpendingsAction implements Action {
    readonly type = SpendingActionType.TRIP_FETCH_SPENDINGS;

    constructor(public payload: {tripId: string}) {}
}

export class TripFetchSpendingsSuccessAction implements Action {
    readonly type = SpendingActionType.TRIP_FETCH_SPENDINGS_SUCCESS;

    constructor(public payload: {tripId: string, spendings: Spendings}) {}
}

export class TripFetchSpendingsErrorAction implements Action {
    readonly type = SpendingActionType.TRIP_FETCH_SPENDINGS_ERROR;
}
