import { OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';

export class ShoppingListService implements OnInit{
public ingredientsChanged = new Subject<Ingredient[]>();
public ingredientClicked = new Subject<Number>();   
public ingredients: Ingredient[] = [new Ingredient('Apples',5),new Ingredient('Tomatoes',10)];
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
    this.ingredients.push(... addedIngredients)
    this.ingredientsChanged.next(this.ingredients.slice())
}
updateIngredient(index, ingredient){
    console.log("ingredient",ingredient)
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice())
}
deleteIngredient(index){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
}
}