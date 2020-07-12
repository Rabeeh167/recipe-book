import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes : Recipe[];
  private subscription: Subscription;


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
     this.recipes = this.recipeService.getRecipes();
     this.subscription = this.recipeService.recipesUpdated.subscribe(
       (recipes: Recipe[]) =>{
         this.recipes = recipes;
       }
     )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    }
}
