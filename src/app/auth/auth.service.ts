import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Injectable({ providedIn: 'root' })
export class AuthService {
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>) { }
    public errorMessage = '';
    public expirationTimer;

    signUp(email: string, password: string) {

        const postObject = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
            postObject)
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }
                ));
    }

    signIn(email: string, password: string) {
        const postObject = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`, postObject)
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }
                ));

    }

    handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationTime = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, id, token, expirationTime)
        console.log("user", user)
        // this.user.next(user)
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
            email: user.email,
            id:  user.id,
            token: user.token,
            expirationTime: new Date(expirationTime).getTime() 
        }))
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    handleError(errorRes: HttpErrorResponse) {
        if (!errorRes.error || !errorRes.error.error) {
            this.errorMessage = 'An unknown  error occured';
            throwError(this.errorMessage);
        }
        else {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    this.errorMessage = 'Email already exist'
                    break;
                case 'EMAIL_NOT_FOUND':
                    this.errorMessage = 'Email does not exist'
                    break;
                case 'INVALID_PASSWORD':
                    this.errorMessage = 'Invalid password'
                    break;
            }
            return throwError(this.errorMessage);
        }
    }

    logout() {

        // this.user.next(null);
        // this.store.dispatch(new AuthActions.AuthLogout())
        // this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        let loggedinUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenexpirationdate))
        console.log("loggedinUser", loggedinUser)
        if (loggedinUser.token) {
            // this.user.next(loggedinUser);
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
                email: userData.email,
                id:  userData.id,
                token: userData._token,
                expirationTime: new Date(userData._tokenexpirationdate).getTime() 
            }))
            this.autoLogout(new Date(userData._tokenexpirationdate).getTime() - new Date().getTime());
        }
    }

    autoLogout(expirationDuration) {
        console.log("expirationDuration", expirationDuration)
        this.expirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }
}