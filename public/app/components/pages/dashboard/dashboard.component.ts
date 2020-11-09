import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { TripAddDialogComponent } from '../../commons/trip-add-dialog/trip-add-dialog.component';

import { Trip, Trips, TripStatus } from '../../../models/trip.model';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getUserTripsState } from '../../../trips/store/reducers';
import { TripFetchTripsAction, TripValidateTripAction } from 'public/app/trips/store/actions/trip.action';
import { User } from 'public/app/models/user.model';
import { getLoggedUser } from 'public/app/users/store/reducers';
import { takeUntil, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../commons/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    trips$: Observable<Trips>;
    loggedUser$: Observable<User>;
    private unsubscribed$ = new Subject();

    constructor(private dialog: MatDialog, private store: Store<any>, private router: Router) {
        this.trips$ = this.store.pipe(
            select(getUserTripsState),
            map(trips => {
                trips.sort((t1, t2) => t2.lastModified - t1.lastModified);
                return trips;
            })
        );
        this.loggedUser$ = this.store.pipe(
            select(getLoggedUser)
        );
    }

    ngOnInit() {
        this.getTrips();
    }

    ngOnDestroy(): void {
        this.unsubscribed$.next();
        this.unsubscribed$.complete();
    }

    getTrips(): void {
        this.loggedUser$.pipe(
            takeUntil(this.unsubscribed$)
        ).subscribe(loggedUser => {
            if (loggedUser) {
                this.store.dispatch(new TripFetchTripsAction({userId: loggedUser.userId}));
            }
        });
    }

    onSelect(selectedTrip: Trip): void {
        if (selectedTrip.status !== TripStatus.VALIDATED) {
            console.log('error');
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    confirmQuestion: 'This trip is in PENDING state. \
                    It will be accessible once it is VALIDATED but then you cannot change its details anymore. \
                    Would you like to validate it?'
                }
            });
            dialogRef.afterClosed()
                .pipe(
                    takeUntil(this.unsubscribed$)
                ).subscribe(answer => {
                    if (answer) {
                        this.store.dispatch(new TripValidateTripAction({tripId: selectedTrip.tripId}));
                        this.router.navigate(['trip', selectedTrip.tripId]);
                    }
                });
        } else {
            this.router.navigate(['trip', selectedTrip.tripId]);
        }
    }

    openAddTripDialog(): void {
        // noinspection TypeScriptValidateTypes
        const dialogRef = this.dialog.open(TripAddDialogComponent, {
            width: '80vw'
        });

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this.unsubscribed$)
            ).subscribe(() => console.log('Add trip dialog close'));
    }

}
