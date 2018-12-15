import { Action } from '@ngrx/store';
import { SpendingActionType, TripFetchSpendingsSuccessAction } from '../actions/spending.action';


export function reducer(spendingsState = new Map(), action: Action) {
  switch (action.type) {
    case SpendingActionType.TRIP_FETCH_SPENDINGS_SUCCESS:
      const fssa = action as TripFetchSpendingsSuccessAction;

      spendingsState[fssa.payload.tripId] = fssa.payload.spendings;
      return spendingsState;
  }
  return spendingsState;
}


