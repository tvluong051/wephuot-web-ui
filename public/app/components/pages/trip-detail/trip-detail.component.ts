import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../../models/trip.model';
import { Spendings } from '../../../models/spending.model';
import { Users, User } from '../../../models/user.model';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getTripStateById, getSpendingsStateByTripId, getParticipantsStateByTripId } from '../../../trips/store/reducers';
import { TripFetchTripDetailAction } from 'public/app/trips/store/actions/trip.action';
import { TripFetchSpendingsAction } from 'public/app/trips/store/actions/spending.action';
import { getLoggedUser, getUsersDetails } from 'public/app/users/store/reducers';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnDestroy {

    trip$: Observable<Trip>;
    spendings$: Observable<Spendings>;
    participants$: Observable<Users>;
    loggedUser$: Observable<User>;
    tripId: string;
    addSpendingBoxShowUp = false;

    private unsubscribed$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getTripDetail();
    }

    ngOnDestroy() {
        this.unsubscribed$.next();
        this.unsubscribed$.complete();
    }

    getTripDetail(): void {
        this.tripId = this.route.snapshot.paramMap.get('tripId');

        this.trip$ = this.store.pipe(
            select(getTripStateById, {
                tripId: this.tripId
            })
        );
        this.store.pipe(
            select(getParticipantsStateByTripId, {
                tripId: this.tripId
            }),
            takeUntil(this.unsubscribed$)
        ).subscribe(participants => {
            if (participants) {
                const usersIds = participants.map(participant => participant.userId);
                this.participants$ = this.store.pipe(
                    select(getUsersDetails, {usersIds: usersIds})
                );
            }
        });

        this.spendings$ = this.store.pipe(
            select(getSpendingsStateByTripId, {
                tripId: this.tripId
            }),
            map(spendings => {
                if (spendings) {
                    spendings.sort((s1, s2) => s2.spentDate - s1.spentDate);
                }
                return spendings;
            })
        );
        this.loggedUser$ = this.store.pipe(
            select(getLoggedUser)
        );

        this.store.dispatch(new TripFetchTripDetailAction({
            tripId: this.tripId
        }));

        this.store.dispatch(new TripFetchSpendingsAction({
            tripId: this.tripId
        }));
    }

    showAddSpendingBox() {
        this.addSpendingBoxShowUp = true;
    }

    hideAddSpendingBox() {
        this.addSpendingBoxShowUp = false;
    }

    showReport() {
        this.router.navigate(['report', this.tripId]);
    }

    downloadReport() {}

    goBack() {
        this.location.back();
    }

}
