import { Component, OnInit, Input } from '@angular/core'
import {Recipe } from '../../recipe.model';
import { RecipeService } from './../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private recipeService:RecipeService) { }
  @Input() recipe: Recipe;
  @Input() index: number;
  ngOnInit(): void {
    
  }
  recipeClicked(){
    console.log("this.recipe",this.recipe)
    // this.recipeService.selectedRecipe.emit(this.recipe)
  }

}
