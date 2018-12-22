import { Action } from '@ngrx/store';
import { UserActionType, UserLoggedUserInfoSuccessAction } from '../actions/user.action';
import { User, Users } from 'public/app/models/user.model';

export function loggerUserReducer(state: User = null, action: Action) {
    switch (action.type) {
        case UserActionType.USER_LOGGED_USERINFO_SUCCESS:
            const lusa = action as UserLoggedUserInfoSuccessAction;

            state = lusa.payload.user;
            return state;
    }
    return state;
}

export function tripBuddiesReducer(state: Users = [], action: Action) {
    return state;
}
