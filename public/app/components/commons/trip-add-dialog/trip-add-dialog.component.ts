import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { Trip } from '../../../models/trip.model';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { TripSaveTripAction } from 'public/app/trips/store/actions/trip.action';

export interface TripAddDialogData {
  newTrip: Trip;
  creator: User;
}

@Component({
  selector: 'app-trip-add-dialog',
  templateUrl: './trip-add-dialog.component.html',
  styleUrls: ['./trip-add-dialog.component.scss']
})
export class TripAddDialogComponent implements OnInit {

  tripCreationFormGroup: FormGroup;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    public dialogRef: MatDialogRef<TripAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripAddDialogData,
    private _formBuilder: FormBuilder,
    private store: Store<any>) {}

  ngOnInit() {
    this.tripCreationFormGroup = this._formBuilder.group({
      tripDetailFormGroup: this._formBuilder.group({
        tripName: ['', Validators.required],
        tripDescription: ''
      }),
      participantsFormGroup: this._formBuilder.group({
        test: ''
      })
    });
  }

  saveTrip(validate = false): void {
    const trip = {
      name: this.tripCreationFormGroup.value.tripDetailFormGroup.tripName,
      description: this.tripCreationFormGroup.value.tripDetailFormGroup.tripDescription,
      coverPhotoBase64Encoded: this.croppedImage
    } as Trip;
    this.store.dispatch(new TripSaveTripAction({
      trip: trip,
      users: [
        {
          userId: 'testId',
          email: 'toto@toto.com'
        } as User
      ],
      validate: validate
    }));
    this.dialogRef.close();
  }

  /* Photo cropper methods */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
