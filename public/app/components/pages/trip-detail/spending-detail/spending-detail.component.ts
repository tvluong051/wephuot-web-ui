import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Spending } from '../../../../models/spending.model';
import { Users } from '../../../../models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-spending-detail',
    templateUrl: './spending-detail.component.html',
    styleUrls: ['./spending-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SpendingDetailComponent implements OnInit {

    @Input()
    participants: Users;

    spendingFormGroup: FormGroup;

    @Input()
    spending: Spending;
    spentDateInput: Date;
    crediterId: String;
    equallyDivided: boolean;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.resetForm();
    }

    resetForm() {
        this.spendingFormGroup = this.buildSpendingFormGroup();
    }

    buildSpendingFormGroup(): FormGroup {
        const controls = {
            ...this.spending.shareparts
        };
        this.participants.forEach(participant => {
            if (!controls[participant.userId]) {
                controls[participant.userId] = '';
            }
        });
        return this._formBuilder.group({
            crediterFormGroup: this._formBuilder.group({
                amount: this.spending.amount,
                spentDate: new Date(this.spending.spentDate),
                crediterId: this.spending.crediter.userId
            }),
            sharepartsFormGroup: this._formBuilder.group({
                equallyDivided: this.spending.equallyDivided,
                shareparts: this._formBuilder.group(controls)
            })
        });
    }


}
