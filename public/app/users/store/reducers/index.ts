import { User, Users } from '../../../models/user.model';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { loggerUserReducer, tripBuddiesReducer, searchReducer } from './users.reducer';

export interface UsersState {
    loggedUser: User;
    tripBuddies: Users;
    searchResults: Users;
}

export const reducers: ActionReducerMap<any> = {
    loggedUser: loggerUserReducer,
    tripBuddies: tripBuddiesReducer,
    searchResults: searchReducer
};

export const getUsersState = createFeatureSelector<UsersState>('users');

export const getLoggedUser = createSelector(
    getUsersState,
    (state: UsersState) => state.loggedUser
);

export const getUserSearchResults = createSelector(
    getUsersState,
    (state: UsersState) => state.searchResults
);

export const getUsersDetails = createSelector(
    getUsersState,
    (state: UsersState, props: {usersIds: string[]}) => {
        const users: Users = [];
        props.usersIds.forEach(userId => {
            if (state.loggedUser.userId === userId) {
                users.push(state.loggedUser);
            } else {
                users.push(state.tripBuddies.find(buddy => buddy.userId === userId));
            }
        });
        return users;

    }
);
