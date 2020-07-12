import { Component }   from '@angular/core'
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipes',
    templateUrl:'./recipes.component.html'
})
export class RecipesComponent{
public selectedRecipe : Recipe;
private subscription: Subscription;
constructor(private recipeService : RecipeService) { }

ngOnInit(): void {
    this.subscription = this.recipeService.selectedRecipe.subscribe((recipe:Recipe) => {
    this.selectedRecipe = recipe;
    })
}

ngOnDestroy(){
this.subscription.unsubscribe();
}
    
}