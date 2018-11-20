import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { TripAddDialogComponent } from '../../commons/trip-add-dialog/trip-add-dialog.component';

import { TripService } from '../../../services/trip.service';
import { Trip, Trips, TripStatus } from '../../../models/trip.model';
import { User } from '../../../models/user.model';

export interface TripAddDialogData {
  newTrip: Trip;
  creator: User;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  trips: Trips;

  constructor(private dialog: MatDialog, private tripService: TripService, private router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe(trips => this.trips = trips);
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

    dialogRef.afterClosed().subscribe(creation => {
      if (creation) {
        this.getTrips();
      }
    });
  }

}
