import { Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Spending } from '../../../../models/spending.model';
import { Users, User } from '../../../../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TripUpdateSpendingAction, TripDeleteSpendingAction } from 'public/app/trips/store/actions/spending.action';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'public/app/components/commons/confirm-dialog/confirm-dialog.component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-spending-detail',
    templateUrl: './spending-detail.component.html',
    styleUrls: ['./spending-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SpendingDetailComponent implements OnInit, OnDestroy {

    @Input()
    tripId: string;

    @Input()
    participants: Users;

    @Input()
    spending: Spending;

    crediter: User;
    private crediterValueChange$: Subscription;

    spendingFormGroup: FormGroup;
    private unsubscribed$ = new Subject();

    constructor(private _formBuilder: FormBuilder, private store: Store<any>, private dialog: MatDialog) { }

    ngOnDestroy(): void {
        this.unsubscribed$.next();
        this.unsubscribed$.complete();
    }

    ngOnInit() {
        this.resetForm();
    }

    resetForm() {
        this.crediter = this.spending.crediter;
        const crediter = this.participants.find(participant => participant.userId === this.spending.crediter.userId);
        if (crediter) {
            this.crediter = crediter;
        }
        if (this.crediterValueChange$) {
            this.crediterValueChange$.unsubscribe();
        }

        this.spendingFormGroup = this.buildSpendingFormGroup(this.spending, this.participants);
        this.crediterValueChange$ = this.spendingFormGroup
            .get('crediterFormGroup')
            .get('crediterId')
            .valueChanges
            .pipe(
                debounceTime(300),
                takeUntil(this.unsubscribed$)
            ).subscribe(value => {
                if (value) {
                    const newCrediter = this.participants.find(participant => participant.userId === value);
                    if (newCrediter) {
                        this.crediter = newCrediter;
                    }
                }
            });
    }

    buildSpendingFormGroup(spending: Spending, participants: Users): FormGroup {
        const controls = {
            ...spending.shareparts
        };
        participants.forEach(participant => {
            if (!controls[participant.userId]) {
                controls[participant.userId] = '';
            }
        });
        return this._formBuilder.group({
            crediterFormGroup: this._formBuilder.group({
                amount: spending.amount,
                spentDate: new Date(spending.spentDate),
                crediterId: spending.crediter.userId
            }),
            sharepartsFormGroup: this._formBuilder.group({
                equallyDivided: spending.equallyDivided,
                shareparts: this._formBuilder.group(controls)
            })
        });
    }

    deleteSpending() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                confirmQuestion: 'Delete spending is irreversible. Are you sure you want to proceed?'
            }
        });
        dialogRef.afterClosed()
            .pipe(
                takeUntil(this.unsubscribed$)
            ).subscribe(answer => {
                if (answer) {
                    this.store.dispatch(new TripDeleteSpendingAction({
                        tripId: this.tripId,
                        spendingId: this.spending.id
                    }));
                }
            });

    }

    updateSpending() {
        const shareparts = {};
        const sharepartsRaw = this.spendingFormGroup.value.sharepartsFormGroup.shareparts;
        Object.keys(sharepartsRaw)
            .filter(key => sharepartsRaw[key] !== '' && sharepartsRaw[key] !== 0)
            .forEach(key => shareparts[key] = sharepartsRaw[key]);

        const spending = {
            id: this.spending.id,
            description: this.spending.description,
            amount: this.spendingFormGroup.value.crediterFormGroup.amount,
            spentDate: this.spendingFormGroup.value.crediterFormGroup.spentDate * 1, // convert Date to epoch timestamp
            crediter: {
                userId: this.spendingFormGroup.value.crediterFormGroup.crediterId
            } as User,
            equallyDivided: this.spendingFormGroup.value.sharepartsFormGroup.equallyDivided,
            shareparts: shareparts
        } as Spending;

        this.store.dispatch(new TripUpdateSpendingAction({
            tripId: this.tripId,
            spending: spending
        }));
    }
}
