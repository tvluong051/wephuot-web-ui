import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { Trip, Trips, TripStatus } from '../../../models/trip.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private trips: Trips;

  constructor(private tripService: TripService, private router: Router) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;
    });
  }

  onSelect(selectedTrip: Trip) {
    if (selectedTrip.status !== TripStatus.VALIDATED) {
      console.log('error');
    } else {
      this.router.navigate(['trip', selectedTrip.tripId]);
    }

  }

}
