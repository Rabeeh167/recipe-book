import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router:Router,
        private store: Store<fromApp.AppState>){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot){
        // return this.authService.user.pipe(
        return this.store.select('auth').pipe(
            take(1),
            map( authState => authState.user),
            map( user =>{
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth'])
        }),
        )
    }
}