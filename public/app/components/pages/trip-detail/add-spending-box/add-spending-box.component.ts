import { Component, OnInit, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Users, User } from 'public/app/models/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TripAddSpendingAction } from 'public/app/trips/store/actions/spending.action';
import { Spending } from 'public/app/models/spending.model';

@Component({
    selector: 'app-add-spending-box',
    templateUrl: './add-spending-box.component.html',
    styleUrls: ['./add-spending-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddSpendingBoxComponent implements OnInit, OnDestroy {

    @Input()
    tripId: string;
    @Input()
    loggedUser$: Observable<User>;
    @Input()
    participants$: Observable<Users>;
    @Output()
    close = new EventEmitter();

    private unsubscribed$ = new Subject();

    addSpendingFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder, private store: Store<any>) {}

    ngOnInit() {
        this.addSpendingFormGroup = this._formBuilder.group({
            description: ['', Validators.required]
        });
        this.loggedUser$
            .pipe(
                takeUntil(this.unsubscribed$)
            ).subscribe(loggedUser => {
                const crediterFormGroupName = 'crediterFormGroup';

                if (loggedUser) {
                    this.addSpendingFormGroup.addControl(crediterFormGroupName, this._formBuilder.group({
                        amount: [0, Validators.required],
                        crediterId: loggedUser.userId,
                        spentDate: new Date()
                    }));
                }
            });
        this.participants$
            .pipe(
                takeUntil(this.unsubscribed$)
            ).subscribe(participants => {
                const sharepartsFormGroupName = 'sharepartsFormGroup';

                if (participants && this.addSpendingFormGroup.contains(sharepartsFormGroupName)) {
                    this.addSpendingFormGroup.setControl(sharepartsFormGroupName, this._formBuilder.group({
                        equallyDivided: true,
                        shareparts: this.buildSharepartsControls(participants)
                    }));
                } else {
                    this.addSpendingFormGroup.addControl(sharepartsFormGroupName, this._formBuilder.group({
                        equallyDivided: true,
                        shareparts: this.buildSharepartsControls(participants)
                    }));
                }
            });

    }

    ngOnDestroy(): void {
        this.unsubscribed$.next();
        this.unsubscribed$.complete();
    }

    buildSharepartsControls(participants: Users) {
        const controls = {};
        participants.forEach(participant => controls[participant.userId] = '');

        return this._formBuilder.group(controls);
    }

    discard() {
        this.close.emit();
    }

    saveSpending() {
        const shareparts = {};
        const sharepartsRaw = this.addSpendingFormGroup.value.sharepartsFormGroup.shareparts;
        Object.keys(sharepartsRaw)
            .filter(key => sharepartsRaw[key] !== '' && sharepartsRaw[key] !== 0)
            .forEach(key => shareparts[key] = sharepartsRaw[key]);

        const spending = {
            description: this.addSpendingFormGroup.value.description,
            amount: this.addSpendingFormGroup.value.crediterFormGroup.amount,
            spentDate: this.addSpendingFormGroup.value.crediterFormGroup.spentDate * 1, // cast date to long
            crediter: {
                userId: this.addSpendingFormGroup.value.crediterFormGroup.crediterId,
            } as User,
            equallyDivided: this.addSpendingFormGroup.value.sharepartsFormGroup.equallyDivided,
            shareparts: shareparts

        } as Spending;
        this.store.dispatch(new TripAddSpendingAction({
            tripId: this.tripId,
            spending: spending
        }));
        this.discard();
    }
}
