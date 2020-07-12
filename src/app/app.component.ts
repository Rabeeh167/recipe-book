import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}

  
  title = 'udemy-app';
  // recipePageSelected : boolean = true;
  // shoppinglistPageSelected : boolean = false;
  // selectedPage(event){
  //   if(event.Recipe){
  //     this.recipePageSelected = true;
  //     this.shoppinglistPageSelected =false;
  //   }
  //   else if(event.ShoppingList){  
  //     this.shoppinglistPageSelected =true;
  //     this.recipePageSelected = false;
  //   }
  // }
  ngOnInit(){
    this.authService.autoLogin();
  }
}
