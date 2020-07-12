import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartupComponent } from './recipes/recipe-startup/recipe-startup.component';
import { RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes : Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
]
@NgModule({
    imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule] 
})
export class AppRoutingModule{

}