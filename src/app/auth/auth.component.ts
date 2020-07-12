import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }
  public isLoginMode = false;
  public isLoading = false;
  public error: string;
  public authObs: Observable<any>;
  ngOnInit(): void {
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
    if (this.isLoginMode) {
      this.authObs = this.authService.signIn(email, password)
    }
    else {
      this.isLoading = true;
      this.authObs = this.authService.signUp(email, password)
      form.reset();
    }
    this.authObs.subscribe(
      responseData => {
        console.log("responseData", responseData)
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error => {
        console.log("error", error)
        this.error = error;
        this.isLoading = false;
      }
    )
  }

  onClose(){
    this.error = null;
  }
}
