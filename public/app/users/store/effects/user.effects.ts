import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    UserActionType,
    UserLoggedUserInfoSuccessAction,
    UserLoggedUserInfoErrorAction,
    UserFetchUserDetailAction,
    UserFetchUserDetailErrorAction,
    UserFetchUserDetailSuccessAction,
    UserSearchUserAction,
    UserSearchUserSuccessAction
} from '../actions/user.action';
import { tap, map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { User, UserSearchResult } from 'public/app/models/user.model';

@Injectable()
export class UserEffects {
    private readonly userApiUrl = 'api/user';

    constructor(public httpClient: HttpClient, private actions$: Actions) {}

    @Effect()
    userinfo$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionType.USER_LOGGED_USERINFO),
        switchMap(() =>
            this.httpClient.get(`/userinfo`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log('Get userinfo of logged user')),
                map(user => new UserLoggedUserInfoSuccessAction({user: user as User})),
                catchError((error) => {
                    if (error.status === 401) {
                        return of(new UserLoggedUserInfoErrorAction({status: error.status, info: {redirectUrl: error.error.redirectUrl}}));
                    }
                    return of(new UserLoggedUserInfoErrorAction({status: error.status}));
                })

            )
        )
    );

    @Effect()
    fetchUserDetail$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionType.USER_FETCH_USER_DETAIL),
        mergeMap((action: UserFetchUserDetailAction) =>
            this.httpClient.get(`${this.userApiUrl}/persons/person/${action.payload.userId}`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }).pipe(
                tap(() => console.log(`Get detail for user id = ${action.payload.userId}`)),
                map(user => new UserFetchUserDetailSuccessAction({
                    user: user as User
                })),
                catchError(() => of(new UserFetchUserDetailErrorAction()))
            )
        )
    );

    @Effect()
    searchUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActionType.USER_SEARCH_USER),
        switchMap((action: UserSearchUserAction) =>
            this.httpClient.get(`${this.userApiUrl}/persons/search`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                params: {
                    term: action.payload.searchTerm
                }
            }).pipe(
                tap(() => `Search user with searching term = ${action.payload.searchTerm}`),
                map(results => new UserSearchUserSuccessAction({
                    result: (results as UserSearchResult).results
                }))
            )
        )
    );
}
