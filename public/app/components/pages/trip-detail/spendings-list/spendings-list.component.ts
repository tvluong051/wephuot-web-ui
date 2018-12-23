import { Component, Input, OnInit } from '@angular/core';
import { Spendings } from '../../../../models/spending.model';
import { Users } from '../../../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spendings-list',
  templateUrl: './spendings-list.component.html',
  styleUrls: ['./spendings-list.component.scss']
})
export class SpendingsListComponent implements OnInit {
  @Input()
  tripId: string;

  @Input()
  spendings$: Observable<Spendings>;

  @Input()
  participants$: Observable<Users>;

  constructor() { }

  ngOnInit() {
  }

}
