import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserLoggedUserInfoAction } from './users/store/actions/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private store: Store<any>) {
    this.store.dispatch(new UserLoggedUserInfoAction());
    this.router.navigate(['dashboard']);
  }

}
