import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import  { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private idChangeSub : Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients : Ingredient[])=>{
    this.ingredients = ingredients;
    });
  } 

  ingredientItemClicked(index: Number){
    this.shoppingListService.ingredientClicked.next(index);
  }
  ngOnDestroy(){
    this.idChangeSub.unsubscribe();
  }
}
