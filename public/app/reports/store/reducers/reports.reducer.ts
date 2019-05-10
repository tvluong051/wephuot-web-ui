import { Action } from '@ngrx/store';
import { ReportActionType, ReportFetchTripReportSuccessAction } from '../actions/report.actions';

export function reducer(state = {}, action: Action) {
    switch (action.type) {
        case ReportActionType.REPORT_FETCH_TRIP_REPORT_SUCCESS:
        const ftrsa = action as ReportFetchTripReportSuccessAction;

        const report = {};
        report[ftrsa.payload.tripId] = ftrsa.payload.report;
        state = Object.assign(state, report);
        break;
    }
    return {
        ...state
    };
}
