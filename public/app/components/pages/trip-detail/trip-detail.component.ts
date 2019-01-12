import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../../models/trip.model';
import { Spendings } from '../../../models/spending.model';
import { Users, User } from '../../../models/user.model';
import { Observable, from, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getTripStateById, getSpendingsStateByTripId, getParticipantsStateByTripId } from '../../../trips/store/reducers';
import { TripFetchTripDetailAction } from 'public/app/trips/store/actions/trip.action';
import { TripFetchSpendingsAction } from 'public/app/trips/store/actions/spending.action';
import { getLoggedUser, getUsersDetails } from 'public/app/users/store/reducers';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

    trip$: Observable<Trip>;
    spendings$: Observable<Spendings>;
    participants$: Observable<Users>;
    loggedUser$: Observable<User>;
    tripId: string;
    addSpendingBoxShowUp = false;

    constructor(
        private route: ActivatedRoute,
        private store: Store<any>,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getTripDetail();
    }

    getTripDetail(): void {
        this.tripId = this.route.snapshot.paramMap.get('tripId');

        this.trip$ = this.store.pipe(
            select(getTripStateById, {
                tripId: this.tripId
            })
        );
        this.participants$ = this.store.pipe(
            select(getParticipantsStateByTripId, {
                tripId: this.tripId
            }),
            switchMap(participants => {
                console.log(participants);
                const usersIds = participants.map(participant => participant.userId);
                return this.store.pipe(
                    select(getUsersDetails, {usersIds: usersIds})
                );
            })
        );
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

    goBack() {
        this.location.back();
    }

}
