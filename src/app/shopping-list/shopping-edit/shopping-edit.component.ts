import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientClicked.subscribe(
      (index : Number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          'name':this.editedIngredient.name,
          'amount':this.editedIngredient.amount
        })
      }
    )
  }
  addIngredient(form: NgForm){
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount))
    }
    else{
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount))
    }
    form.reset();
    this.editMode = false;
  }

  onClear()
  {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    }
}
