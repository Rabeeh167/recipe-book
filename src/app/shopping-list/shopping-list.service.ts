import { OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';
export class ShoppingListService implements OnInit{
public ingredientsChanged = new Subject<Ingredient[]>();
public ingredientClicked = new Subject<Number>();   
public ingredients: Ingredient[] = [new Ingredient('Apples',5),new Ingredient('Tomatoes',10)];
constructor(private store: Store<fromApp.AppState>){}
ngOnInit(){
}
getIngredients(){
    return this.ingredients.slice();
}
getIngredient(index){
return this.ingredients[index];
}
addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
}
addIngredientsToShoppingList(addedIngredients : Ingredient[]){
    this.store.dispatch(new ShoppingListActions.AddIngredients(addedIngredients))
    // this.ingredients.push(... addedIngredients)
    // this.ingredientsChanged.next(this.ingredients.slice())
}
updateIngredient(index, ingredient){
    this.store.dispatch(new ShoppingListActions.UpdateIngredient({'index': index, 'ingredient':ingredient}))
    // this.ingredients[index] = ingredient;
    // this.ingredientsChanged.next(this.ingredients.slice())
}
deleteIngredient(index){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(index))
    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice())
}
}