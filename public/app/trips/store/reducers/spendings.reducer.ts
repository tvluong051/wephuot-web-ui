import { Action } from '@ngrx/store';
import { SpendingActionType, TripFetchSpendingsSuccessAction, TripAddSpendingSuccessAction } from '../actions/spending.action';


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
  }
  return spendingsState;
}


