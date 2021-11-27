import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>) { }
  public isLoginMode = false;
  public isLoading = false;
  public error: string;
  public authObs: Observable<any>;
  ngOnInit(): void {
    this.store.select('auth').subscribe( authState =>{
      this.isLoading = authState.loading;
      this.error = authState.authError;
      })
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    console.log("from", form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log('this.isLoginMode',this.isLoginMode)
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({
        email: email,password: password
      }))
      // this.authObs = this.authService.signIn(email, password)
    }
    else {
      // this.isLoading = true;
      // this.authObs = this.authService.signUp(email, password)
      this.store.dispatch(new AuthActions.SignupStart({email:email, password:password}))
      form.reset();
    }

    this.store.select('auth').subscribe( authState =>{

    })
    // this.authObs.subscribe(
    //   responseData => {
    //     console.log("responseData", responseData)
    //     this.router.navigate(['/recipes']);
    //     this.isLoading = false;
    //   },
    //   error => {
    //     console.log("error", error)
    //     this.error = error;
    //     this.isLoading = false;
    //   }
    // )
  }

  onClose(){
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError())
  }
}
