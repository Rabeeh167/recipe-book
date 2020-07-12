import { Injectable } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';



@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor( private dataStorageService : dataStorageService, private recipeservice: RecipeService ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeservice.getRecipes();

        if(recipes.length === 0)
        return this.dataStorageService.fetchRecipe();
        else
        return recipes;
    }
}