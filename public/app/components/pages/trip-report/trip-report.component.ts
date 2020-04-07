import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ReportFetchTripReportAction } from 'public/app/reports/store/actions/report.actions';
import { getReportByTripId } from 'public/app/reports/store/reducers';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { Trip } from 'public/app/models/trip.model';
import { Users } from 'public/app/models/user.model';
import { TripFetchTripDetailAction } from 'public/app/trips/store/actions/trip.action';
import { getUsersDetails } from 'public/app/users/store/reducers';
import { getTripStateById } from 'public/app/trips/store/reducers';

@Component({
    selector: './app-trip-report',
    templateUrl: './trip-report.component.html',
    styleUrls: ['./trip-report.component.scss']
})
export class TripReportComponent implements OnInit, OnDestroy {

    private tripId: string;
    trip$: Observable<Trip>;
    participants$: Observable<Users>;

    private unsubscribed$ = new Subject();

    chart: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private store: Store<any>
    ) {}

    ngOnInit() {
        this.tripId = this.route.snapshot.paramMap.get('tripId');

        this.store.dispatch(new ReportFetchTripReportAction({tripId: this.tripId}));
        this.store.pipe(
            select(getReportByTripId, {tripId: this.tripId}),
            takeUntil(this.unsubscribed$)
        ).subscribe(tripBalance => {
            this.buildChart(tripBalance);
        });

        this.trip$ = this.store.pipe(
            select(getTripStateById, {
                tripId: this.tripId
            })
        );

        this.store.dispatch(new TripFetchTripDetailAction({
            tripId: this.tripId
        }));
    }

    ngOnDestroy() {
        this.unsubscribed$.next();
        this.unsubscribed$.complete();
    }

    buildChart(tripBalance: any) {
        if (tripBalance) {
            const labels = Object.keys(tripBalance.credits);
            const credits = [];
            const debits = [];
            const results = [];
            const resultsBgColors = [];
            const resultsBorderColors = [];
            for (let i = 0; i < labels.length; i++) {
                credits.push(tripBalance.credits[labels[i]]);
                debits.push(-tripBalance.debits[labels[i]]);
                const res = tripBalance.credits[labels[i]] - tripBalance.debits[labels[i]];

                results.push(res);
                if (res >= 0) {
                    resultsBgColors.push('rgba(54, 162, 235, 0.4)');
                    resultsBorderColors.push('rgb(54, 162, 235)');
                } else {
                    resultsBgColors.push('rgba(255, 99, 132, 0.4)');
                    resultsBorderColors.push('rgb(255, 99, 132');
                }
            }

            this.chart = new Chart('canvas', {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Credits',
                            data: credits,
                            backgroundColor: 'rgba(75, 192, 192, 0.4)',
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 1
                        }, {
                            label: 'Debits',
                            data: debits,
                            backgroundColor: 'rgba(255, 205, 86, 0.4)',
                            borderColor: 'rgb(255, 205, 86)',
                            borderWidth: 1
                        }, {
                            label: 'Totals',
                            data: results,
                            backgroundColor: resultsBgColors,
                            borderColor: resultsBorderColors,
                            borderWidth: 1
                        }

                    ]
                }
            });

            this.store.pipe(
                select(getUsersDetails, {usersIds: this.chart.data.labels}),
                takeUntil(this.unsubscribed$)
            ).subscribe(participants => {
                if (participants && participants.length > 0) {
                    const labelMap = {};
                    for (let i = 0; i < participants.length; i++) {
                        labelMap[participants[i].userId] = participants[i].displayName;
                    }

                    const newLabels = this.chart.data.labels
                        .map(crediterId => labelMap[crediterId] ? labelMap[crediterId] : crediterId);

                    this.chart.data.labels = newLabels;
                    this.chart.update();
                }
            });
        }
    }

    goBack() {
        this.location.back();
    }
}
