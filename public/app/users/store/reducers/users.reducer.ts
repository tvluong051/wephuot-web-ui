import { Action } from '@ngrx/store';
import {
    UserActionType,
    UserLoggedUserInfoSuccessAction,
    UserFetchUserDetailSuccessAction,
    UserSearchUserSuccessAction,
    UserLoggedUserInfoErrorAction
} from '../actions/user.action';
import { User, Users } from 'public/app/models/user.model';

export function loggedStatusReducer(state = {}, action: Action) {
    switch (action.type) {
        case UserActionType.USER_LOGGED_USERINFO_SUCCESS:
            state = {
                logged: true,
                loginUrl: null
            };
            break;
        case UserActionType.USER_LOGGED_USERINFO_ERROR:
            const luea = action as UserLoggedUserInfoErrorAction;

            if (luea.payload.status === 401) {
                state = {
                    logged: false,
                    loginUrl: luea.payload.info.redirectUrl
                };
            } else {
                state = {
                    logged: false
                };
            }
            break;
    }
    return state;
}

export function loggerUserReducer(state: User = null, action: Action) {
    switch (action.type) {
        case UserActionType.USER_LOGGED_USERINFO_SUCCESS:
            const lusa = action as UserLoggedUserInfoSuccessAction;

            state = lusa.payload.user;
            break;
    }
    return state;
}

export function tripBuddiesReducer(state: Users = [], action: Action) {
    switch (action.type) {
        case UserActionType.USER_FETCH_USER_DETAIL_SUCCESS:
            const fudsa = action as UserFetchUserDetailSuccessAction;

            state = state.filter(user => user.userId !== fudsa.payload.user.userId);
            state.push(fudsa.payload.user);
            break;
    }
    return [
        ...state
    ];
}

export function searchReducer(state: Users = [], action: Action) {
    switch (action.type) {
        case UserActionType.USER_SEARCH_USER_SUCCESS:
            const susa = action as UserSearchUserSuccessAction;

            return susa.payload.result;
    }
    return state;
}
