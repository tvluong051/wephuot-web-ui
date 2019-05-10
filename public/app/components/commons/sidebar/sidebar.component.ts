import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'public/app/models/user.model';
import { getLoggedUser } from 'public/app/users/store/reducers';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  loggedUser$: Observable<User>;

  constructor(private store: Store<any>) {
    this.loggedUser$ = this.store.pipe(
      select(getLoggedUser)
    );
  }

  ngOnInit() {
  }

}
