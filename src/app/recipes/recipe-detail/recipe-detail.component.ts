import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service'
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() 
  public recipe : Recipe;
  public id;
  constructor(private shoppingListService:ShoppingListService,
  private recipeService : RecipeService, 
  private route : ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("this.reciperecipe",this.recipe)

    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )

  }
  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id);
  }
}
