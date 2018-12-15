import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../../models/trip.model';
import { Spendings } from '../../../models/spending.model';
import { Users } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getTripStateById, getSpendingsStateByTripId, getParticipantsStateByTripId } from '../../../trips/store/reducers';
import { TripFetchTripDetailAction } from 'public/app/trips/store/actions/trip.action';
import { TripFetchSpendingsAction } from 'public/app/trips/store/actions/spending.action';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  trip$: Observable<Trip>;
  spendings$: Observable<Spendings>;
  participants$: Observable<Users>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTripDetail();
  }

  getTripDetail(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');

    this.trip$ = this.store.pipe(
      select(getTripStateById, {
        tripId: tripId
      })
    );
    this.participants$ = this.store.pipe(
      select(getParticipantsStateByTripId, {
        tripId: tripId
      })
    );
    this.spendings$ = this.store.pipe(
      select(getSpendingsStateByTripId, {
        tripId: tripId
      })
    );

    this.store.dispatch(new TripFetchTripDetailAction({
      tripId: tripId
    }));

    this.store.dispatch(new TripFetchSpendingsAction({
      tripId: tripId
    }));
  }

  goBack(): void {
    this.location.back();
  }

}
