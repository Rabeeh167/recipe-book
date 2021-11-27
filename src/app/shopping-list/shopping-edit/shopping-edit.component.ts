import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
// import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput',{static:true}) nameInputRef : ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef : ElementRef;
  @ViewChild('f', {static: false}) slForm : NgForm;
  private ingredient: Ingredient;
  private subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: Number;
  editedIngredient: Ingredient;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
    // private store: Store<{shoppingList: {ingredients:Ingredient[]}}>
    ) { }

  ngOnInit(): void {
    // this.subscription = this.shoppingListService.ingredientClicked.subscribe(
    //   (index : Number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedIngredient = this.shoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       'name':this.editedIngredient.name,
    //       'amount':this.editedIngredient.amount
    //     })
    //   }
    // )

    this.subscription = this.store.select('shoppingList').subscribe(stateData =>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          'name':this.editedIngredient.name,
          'amount':this.editedIngredient.amount
        })
      }
      else{
        this.editMode =false;
      }
    })
    
  }
  addIngredient(form: NgForm){
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount))
    }
    else{
      console.log("new ShoppingListActions.AddIngredient(newIngredient)",new ShoppingListActions.AddIngredient(newIngredient))
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
      // this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount))
    }
    form.reset();
    this.editMode = false;
  }

  onClear()
  {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit())
    this.subscription.unsubscribe();
    }
}
