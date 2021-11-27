import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";

@Injectable()// to inject actions and httpclient into this class
export class AuthEffects {
    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router) {
    }

    @Effect()
    authLogin = this.actions$.pipe(
        //only LOGIN_START action event triggers this effect
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            console.log('111111111111')
            const postObject = {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`, postObject)
                .pipe(
                    //called when no error occured
                    map(resData => {
                        const expirationTime = new Date(new Date().getTime() + resData.expiresIn * 1000)
                        //this returned action will automatically get dispatched by ngrx effects
                        return new AuthActions.AuthenticateSuccess({
                            email: resData.email,
                            id: resData.id,
                            token: resData.token,
                            expirationTime: new Date(expirationTime).getTime()
                        })
                    }),
                    //called when there is an error, should return a non error observable so 
                    // the overall stream doesnt die
                    catchError(error => {
                        return this.handleError(error)
                    })
                );
        })
    )

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown  error occured';

        if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.AuthenticateFail(errorMessage));
        }
        else {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already exist'
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email does not exist'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid password'
                    break;
            }
            return of(new AuthActions.AuthenticateFail(errorMessage))
        }
    }


    // dispatch: false will let ngrx effects know that this effect does not yield
    // a dispatchable action at the end.
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap(() => {
        this.router.navigate(['/'])
    }))

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            const postObject = {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
            return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
                postObject)
                .pipe(
                    //called when no error occured
                    map(resData => {
                        const expirationTime = new Date(new Date().getTime() + resData.expiresIn * 1000)
                        //this returned action will automatically get dispatched by ngrx effects
                        return new AuthActions.AuthenticateSuccess({
                            email: resData.email,
                            id: resData.id,
                            token: resData.token,
                            expirationTime: new Date(expirationTime).getTime()
                        })
                    }),
                    //called when there is an error, should return a non error observable so 
                    // the overall stream doesnt die
                    catchError(error => {
                        return this.handleError(error)
                    })
                );
        })
    )
}