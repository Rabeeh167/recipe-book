import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import  { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  private idChangeSub : Subscription;
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients : Ingredient[])=>{
    // this.ingredients = ingredients;
    // });
  } 

  ingredientItemClicked(index: number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
    // this.shoppingListService.ingredientClicked.next(index);
  }
  ngOnDestroy(){
    // this.idChangeSub.unsubscribe();
  }
}
