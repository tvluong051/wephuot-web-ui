import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { Trip } from '../../../models/trip.model';
import { User, Users } from '../../../models/user.model';
import { Store, select } from '@ngrx/store';
import { TripSaveTripAction } from 'public/app/trips/store/actions/trip.action';
import { getLoggedUser, getUserSearchResults } from 'public/app/users/store/reducers';
import { takeUntil, debounceTime, tap, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { UserSearchUserAction } from 'public/app/users/store/actions/user.action';

export interface TripAddDialogData {
  newTrip: Trip;
  creator: User;
}

@Component({
  selector: 'app-trip-add-dialog',
  templateUrl: './trip-add-dialog.component.html',
  styleUrls: ['./trip-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TripAddDialogComponent implements OnInit, OnDestroy {

  tripCreationFormGroup: FormGroup;
  userSearchResult$: Observable<Users>;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  private unsubscribed$ = new Subject();
  buddies: Users = [];

  constructor(
    public dialogRef: MatDialogRef<TripAddDialogComponent>,
    private _formBuilder: FormBuilder,
    private store: Store<any>) {}

  ngOnInit() {
    this.tripCreationFormGroup = this._formBuilder.group({
      tripDetailFormGroup: this._formBuilder.group({
        tripName: ['', Validators.required],
        tripDescription: ''
      }),
      participantsFormGroup: this._formBuilder.group({
        userInput: ''
      })
    });

    this.tripCreationFormGroup
      .get('participantsFormGroup')
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribed$)
      ).subscribe(value => {
        if (value) {
          this.store.dispatch(new UserSearchUserAction({
            searchTerm: value
          }));
        }
      });

    this.userSearchResult$ = this.store.pipe(
      select(getUserSearchResults),
      takeUntil(this.unsubscribed$)
    );
  }

  ngOnDestroy() {
    this.unsubscribed$.next();
    this.unsubscribed$.complete();
  }

  addParticipant(user: User) {
    const found = this.buddies.find(buddy => buddy.userId === user.userId);
    if (!found) {
      this.buddies.push(user);
    }
    console.log(this.buddies);
  }

  removeParticipant(user: User) {
    this.buddies = this.buddies.filter(buddy => buddy.userId !== user.userId);
    console.log(this.buddies);
  }

  saveTrip(validate = false): void {
    const trip = {
      name: this.tripCreationFormGroup.value.tripDetailFormGroup.tripName,
      description: this.tripCreationFormGroup.value.tripDetailFormGroup.tripDescription,
      coverPhotoBase64Encoded: this.croppedImage
    } as Trip;
    this.store.pipe(
      select(getLoggedUser),
      takeUntil(this.unsubscribed$)
    ).subscribe(loggedUser => {
      const me = loggedUser as User;
      const friends = this.buddies.filter(buddy => buddy.userId !== me.userId);

      this.store.dispatch(new TripSaveTripAction({
        trip: trip,
        users: [
          ...friends,
          me
        ],
        validate: validate
      }));
      this.dialogRef.close();
    });
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
