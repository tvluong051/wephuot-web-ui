import { Action } from '@ngrx/store';

export enum ReportActionType {
    REPORT_FETCH_TRIP_REPORT = '[Report] REPORT_FETCH_TRIP_REPORT',
    REPORT_FETCH_TRIP_REPORT_SUCCESS = '[Report] REPORT_FETCH_TRIP_REPORT_SUCCESS',
    REPORT_FETCH_TRIP_REPORT_ERROR = '[Report] REPORT_FETCH_TRIP_REPORT_ERROR'
}

export class ReportFetchTripReportAction implements Action {
    readonly type = ReportActionType.REPORT_FETCH_TRIP_REPORT;

    constructor(public payload: {tripId: string}) {}
}

export class ReportFetchTripReportSuccessAction implements Action {
    readonly type = ReportActionType.REPORT_FETCH_TRIP_REPORT_SUCCESS;

    constructor(public payload: {tripId: string, report: Map<string, any>}) {}
}

export class ReportFetchTripReportErrorAction implements Action {
    readonly type = ReportActionType.REPORT_FETCH_TRIP_REPORT_ERROR;
}
