import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { Trip, Trips } from '../../../models/trip.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private trips: Trips;
  private selectedTrip: Trip;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;
    });
  }

  onSelect(selectedTrip: Trip) {
    this.selectedTrip = selectedTrip;
  }

}
