import { Action } from '@ngrx/store';
import { User } from 'public/app/models/user.model';

export enum UserActionType {
    USER_LOGGED_USERINFO = '[User] USER_LOGGED_USERINFO',
    USER_LOGGED_USERINFO_SUCCESS = '[User] USER_LOGGED_USERINFO_SUCCESS',
    USER_LOGGED_USERINFO_ERROR = '[User] USER_LOGGED_USERINFO_ERROR',
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
}
