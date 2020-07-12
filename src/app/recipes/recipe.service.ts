import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
public selectedRecipe = new Subject<Recipe>();
public recipesUpdated = new Subject<Recipe[]>();
private recipes: Recipe[] = [];
// private recipes: Recipe[] = [ new Recipe('testname', 'test describe',
// "https://image.shutterstock.com/image-vector/home-cooking-recipe-bruschetta-step-260nw-390871786.jpg",
// [new Ingredient('eggs',10), new Ingredient('wheat',4)]),
// new Recipe('testname 2', 'test describe 2',
// "https://image.shutterstock.com/image-vector/home-cooking-recipe-bruschetta-step-260nw-390871786.jpg", 
// [new Ingredient('breads',5), new Ingredient('rice',3)])]

getRecipes(){
    return this.recipes.slice();
}
getRecipe(index : number){
    return this.recipes[index];
}

setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes.slice());
}
addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice());
}
updateRecipe(index, recipe:Recipe){
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice());
}
deleteRecipe(index){
    this.recipes.splice(index,1);
    this.recipesUpdated.next(this.recipes.slice());
}
}