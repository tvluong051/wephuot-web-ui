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
