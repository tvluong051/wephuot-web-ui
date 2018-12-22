import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserActionType, UserLoggedUserInfoSuccessAction, UserLoggedUserInfoErrorAction } from '../actions/user.action';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { User } from 'public/app/models/user.model';

@Injectable()
export class UserEffects {
    private readonly userApiUrl = 'api/user';

    constructor(public httpClient: HttpClient, private actions$: Actions) {}

    @Effect()
    userinfo$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionType.USER_LOGGED_USERINFO),
        mergeMap(() =>
            this.httpClient.get(`${this.userApiUrl}/userinfo`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log('Get userinfo of logged user')),
                map(user => new UserLoggedUserInfoSuccessAction({user: user as User})),
                catchError(() => of(new UserLoggedUserInfoErrorAction()))

            )
        )
    );
}
