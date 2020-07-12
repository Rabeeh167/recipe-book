import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class dataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {
    }
    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-shopping-20c0c.firebaseio.com/Recipes.json', recipes).subscribe(responseData => {
            console.log("respomse", responseData);
        })
    }

    fetchRecipe() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>('https://recipe-shopping-20c0c.firebaseio.com/Recipes.json',
            {
                params: new HttpParams().set('auth',user.token)
            })
        }), map(recipes => {  // map is an rxjs observable operator that allows to transform the data in an observable chain
            return recipes.map(recipe => {  //normal javascript array operator
                return {
                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))
    }
}

// the observable passed in the exhaustMap will replace the outer observable
// take will take 1 value from user and immediately unsubscribes itself.