import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserLoggedUserInfoAction } from './users/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<any>) {
    this.store.dispatch(new UserLoggedUserInfoAction());
  }

}
