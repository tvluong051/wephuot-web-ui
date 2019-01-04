import { Action } from '@ngrx/store';
import { Spendings, Spending } from 'public/app/models/spending.model';

export enum SpendingActionType {
    TRIP_FETCH_SPENDINGS = '[Spending] TRIP_FETCH_SPENDINGS',
    TRIP_FETCH_SPENDINGS_SUCCESS = '[Spending] TRIP_FETCH_SPENDINGS_SUCCESS',
    TRIP_FETCH_SPENDINGS_ERROR = '[Spending] TRIP_FETCH_SPENDINGS_ERROR',


    TRIP_ADD_SPENDING = '[Spending] TRIP_ADD_SPENDING',
    TRIP_ADD_SPENDING_SUCCESS = '[Spending] TRIP_ADD_SPENDING_SUCCESS',
    TRIP_ADD_SPENDING_ERROR = '[Spending] TRIP_ADD_SPENDING_ERROR',

    TRIP_UPDATE_SPENDING = '[Spending] TRIP_UPDATE_SPENDING',
    TRIP_UPDATE_SPENDING_SUCCESS = '[Spending] TRIP_UPDATE_SPENDING_SUCCESS',
    TRIP_UPDATE_SPENDING_ERROR = '[Spending] TRIP_UPDATE_SPENDING_ERROR',

    TRIP_DELETE_SPENDING = '[Spending] TRIP_DELETE_SPENDING',
    TRIP_DELETE_SPENDING_SUCCESS = '[Spending] TRIP_DELETE_SPENDING_SUCCESS',
    TRIP_DELETE_SPENDING_ERROR = '[Spending] TRIP_DELETE_SPENDING_ERROR',
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

export class TripAddSpendingAction implements Action {
    readonly type = SpendingActionType.TRIP_ADD_SPENDING;

    constructor(public payload: {tripId: string, spending: Spending}) {}
}

export class TripAddSpendingSuccessAction implements Action {
    readonly type = SpendingActionType.TRIP_ADD_SPENDING_SUCCESS;

    constructor(public payload: {tripId: string, spending: Spending}) {}
}

export class TripAddSpendingErrorAction implements Action {
    readonly type = SpendingActionType.TRIP_ADD_SPENDING_ERROR;
}

export class TripUpdateSpendingAction implements Action {
    readonly type = SpendingActionType.TRIP_UPDATE_SPENDING;

    constructor(public payload: {tripId: string, spending: Spending}) {}
}

export class TripUpdateSpendingSuccessAction implements Action {
    readonly type = SpendingActionType.TRIP_UPDATE_SPENDING_SUCCESS;

    constructor(public payload: {tripId: string, spending: Spending}) {}
}

export class TripUpdateSpendingErrorAction implements Action {
    readonly type = SpendingActionType.TRIP_UPDATE_SPENDING_ERROR;
}

export class TripDeleteSpendingAction implements Action {
    readonly type = SpendingActionType.TRIP_DELETE_SPENDING;

    constructor(public payload: {tripId: string, spendingId: number}) {}
}

export class TripDeleteSpendingSuccessAction implements Action {
    readonly type = SpendingActionType.TRIP_DELETE_SPENDING_SUCCESS;

    constructor(public payload: {tripId: string, spendingId: number}) {}
}

export class TripDeleteSpendingErrorAction implements Action {
    readonly type = SpendingActionType.TRIP_DELETE_SPENDING_ERROR;
}
