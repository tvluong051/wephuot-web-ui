import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  trip: Trip;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTripDetail();
  }

  getTripDetail(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');

    this.tripService.getTripDetail(tripId)
      .subscribe(trip => {
        console.log(trip);
        this.trip = trip;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
