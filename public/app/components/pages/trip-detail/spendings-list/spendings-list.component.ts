import { Component, Input, OnInit } from '@angular/core';
import { Spendings } from '../../../../models/spending.model';
import { Users } from '../../../../models/user.model';

@Component({
  selector: 'app-spendings-list',
  templateUrl: './spendings-list.component.html',
  styleUrls: ['./spendings-list.component.scss']
})
export class SpendingsListComponent implements OnInit {
  @Input()
  spendings: Spendings;

  @Input()
  participants: Users;

  constructor() { }

  ngOnInit() {
  }

}
