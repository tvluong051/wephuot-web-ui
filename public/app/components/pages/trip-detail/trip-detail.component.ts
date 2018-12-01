import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../services/trip.service';
import { Trip } from '../../../models/trip.model';
import { Spendings } from '../../../models/spending.model';
import { Users } from '../../../models/user.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  trip: Trip;
  spendings: Spendings;
  participants: Users;

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
        this.trip = trip;
        this.participants = trip.participants;
        this.getSpendings(tripId);
      });
  }

  getSpendings(tripId: string): void {
    this.tripService.getTripSpendings(tripId)
      .subscribe(spendings => this.spendings = spendings);
  }

  goBack(): void {
    this.location.back();
  }

}
