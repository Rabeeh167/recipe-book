import { Component, OnInit, OnDestroy} from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor( private dataStorageService:dataStorageService,
  private authService:AuthService) { }
  public isAuthenticated: boolean;
  private userSubscription: Subscription;
  ngOnInit(): void {
    this.authService.user.subscribe(user =>{
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
    this.authService.logout();
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
