import { Action } from '@ngrx/store';
import { User, Users } from 'public/app/models/user.model';

export enum UserActionType {
    USER_LOGGED_USERINFO = '[User] USER_LOGGED_USERINFO',
    USER_LOGGED_USERINFO_SUCCESS = '[User] USER_LOGGED_USERINFO_SUCCESS',
    USER_LOGGED_USERINFO_ERROR = '[User] USER_LOGGED_USERINFO_ERROR',

    USER_FETCH_USER_DETAIL = '[User] USER_FETCH_USER_DETAIL',
    USER_FETCH_USER_DETAIL_SUCCESS = '[User] USER_FETCH_USER_DETAIL_SUCCESS',
    USER_FETCH_USER_DETAIL_ERROR = '[User] USER_FETCH_USER_DETAIL_ERROR',

    USER_SEARCH_USER = '[User] USER_SEARCH_USER',
    USER_SEARCH_USER_SUCCESS = '[User] USER_SEARCH_USER_SUCCESS',
    USER_SEARCH_USER_ERROR = '[User] USER_SEARCH_USER_ERROR'
}

export class UserLoggedUserInfoAction implements Action {
    readonly type = UserActionType.USER_LOGGED_USERINFO;
}

export class UserLoggedUserInfoSuccessAction implements Action {
    readonly type = UserActionType.USER_LOGGED_USERINFO_SUCCESS;

    constructor(public payload: {user: User}) {}
}

export class UserLoggedUserInfoErrorAction implements Action {
    readonly type = UserActionType.USER_LOGGED_USERINFO_ERROR;

    constructor(public payload: {status: number, info?: any}) {}
}

export class UserFetchUserDetailAction implements Action {
    readonly type = UserActionType.USER_FETCH_USER_DETAIL;

    constructor(public payload: {userId: string}) {}
}

export class UserFetchUserDetailSuccessAction implements Action {
    readonly type = UserActionType.USER_FETCH_USER_DETAIL_SUCCESS;

    constructor(public payload: {user: User}) {}
}

export class UserFetchUserDetailErrorAction implements Action {
    readonly type = UserActionType.USER_FETCH_USER_DETAIL_ERROR;
}

export class UserSearchUserAction implements Action {
    readonly type = UserActionType.USER_SEARCH_USER;

    constructor(public payload: {searchTerm: string}) {}
}

export class UserSearchUserSuccessAction implements Action {
    readonly type = UserActionType.USER_SEARCH_USER_SUCCESS;

    constructor(public payload: {result: Users}) {}
}

export class UserSearchUserErrorAction implements Action {
    readonly type = UserActionType.USER_FETCH_USER_DETAIL_ERROR;
}
