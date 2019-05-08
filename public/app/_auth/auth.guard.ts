import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getLoggedStatus } from '../users/store/reducers';
import { map, skipWhile, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<any>, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(getLoggedStatus),
            skipWhile(status => !status.hasOwnProperty('logged')),
            take(1),
            map(status => {
                if (status.logged) {
                    return true;
                }
                this.router.navigate(['login']);
                return false;
            })
        );
    }
}
