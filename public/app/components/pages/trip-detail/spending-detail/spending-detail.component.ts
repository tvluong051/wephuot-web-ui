import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Spending } from '../../../../models/spending.model';
import { Users } from '../../../../models/user.model';

@Component({
  selector: 'app-spending-detail',
  templateUrl: './spending-detail.component.html',
  styleUrls: ['./spending-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpendingDetailComponent implements OnInit {
  @Input('spending')
  set _spending(spending: Spending) {
    this.spending = spending;
    this.resetSpending();
  }

  @Input()
  participants: Users;

  spending: Spending;
  spentDateInput: Date;
  crediterId: String;
  equallyDivided: boolean;

  constructor() { }

  ngOnInit() {
  }

  resetSpending(): void {
    const spending = this.spending;

    if (spending) {
      this.spentDateInput = new Date(spending.spentDate);
      this.crediterId = spending.crediter.userId;
      this.equallyDivided = spending.equallyDivided;
    }
  }

}
