import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { TripAddDialogComponent } from '../../commons/trip-add-dialog/trip-add-dialog.component';

import { Trip, Trips, TripStatus } from '../../../models/trip.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getUserTripsState } from '../../../trips/store/reducers';
import { TripFetchTripsAction } from 'public/app/trips/store/actions/trip.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  trips$: Observable<Trips>;

  constructor(private dialog: MatDialog, private store: Store<any>, private router: Router) {
    this.trips$ = this.store.pipe(
      select(getUserTripsState)
    );
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.store.dispatch(new TripFetchTripsAction({userId: 'testId'}));
  }

  onSelect(selectedTrip: Trip): void {
    if (selectedTrip.status !== TripStatus.VALIDATED) {
      console.log('error');
    } else {
      this.router.navigate(['trip', selectedTrip.tripId]);
    }
  }

  openAddTripDialog(): void {
    // noinspection TypeScriptValidateTypes
    const dialogRef = this.dialog.open(TripAddDialogComponent, {
      width: '80vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => console.log('Add trip dialog close'));
  }

}
