import { Action } from '@ngrx/store';
import {
    SpendingActionType,
    TripFetchSpendingsSuccessAction,
    TripAddSpendingSuccessAction,
    TripUpdateSpendingSuccessAction,
    TripDeleteSpendingSuccessAction
} from '../actions/spending.action';


export function reducer(spendingsState = new Map(), action: Action) {
    switch (action.type) {
        case SpendingActionType.TRIP_FETCH_SPENDINGS_SUCCESS:
            const fssa = action as TripFetchSpendingsSuccessAction;

            spendingsState[fssa.payload.tripId] = fssa.payload.spendings;
            break;
        case SpendingActionType.TRIP_ADD_SPENDING_SUCCESS:
            const assa = action as TripAddSpendingSuccessAction;

            spendingsState[assa.payload.tripId].push(assa.payload.spending);
            break;
        case SpendingActionType.TRIP_UPDATE_SPENDING_SUCCESS:
            const ussa = action as TripUpdateSpendingSuccessAction;
            const currTrip = ussa.payload.tripId;
            const updatedSpending = ussa.payload.spending;

            spendingsState[currTrip] = spendingsState[currTrip].filter(spending => spending.id !== updatedSpending.id);
            spendingsState[currTrip].push(updatedSpending);
            break;
        case SpendingActionType.TRIP_DELETE_SPENDING_SUCCESS:
            const dssa = action as TripDeleteSpendingSuccessAction;
            const updatingTrip = dssa.payload.tripId;

            spendingsState[updatingTrip] = spendingsState[updatingTrip].filter(spending => spending.id !== dssa.payload.spendingId);
            break;
    }
    return {
        ...spendingsState
    };
}


