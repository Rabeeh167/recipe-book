import { Component, OnInit, OnDestroy} from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor( private dataStorageService:dataStorageService,
  private authService:AuthService,
  private store: Store<fromApp.AppState>) { }
  public isAuthenticated: boolean;
  private userSubscription: Subscription;
  ngOnInit(): void {
    this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user =>{
      this.isAuthenticated = !!user;
    })
  }
  public selectedItem = {
    Recipe:false,
    ShoppingList:false
  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onRecipeFetch(){
    this.dataStorageService.fetchRecipe().subscribe();
  }
  onLogout(){
    // this.authService.logout();
    this.store.dispatch(new AuthActions.AuthLogout())

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  // @Output() pageSelection = new EventEmitter();

  // onRecipeClick(){
  //   this.selectedItem.Recipe = true ;
  //   this.selectedItem.ShoppingList = false;
  //   this.pageSelection.emit(this.selectedItem);
  // }
  // onShoppingListClick(){
  //     this.selectedItem.Recipe = false ;
  //     this.selectedItem.ShoppingList = true;
  //     this.pageSelection.emit(this.selectedItem);
  //   }
}
