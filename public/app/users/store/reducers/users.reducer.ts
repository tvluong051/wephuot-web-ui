import { Action } from '@ngrx/store';
import { UserActionType, UserLoggedUserInfoSuccessAction, UserFetchUserDetailSuccessAction } from '../actions/user.action';
import { User, Users } from 'public/app/models/user.model';

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
