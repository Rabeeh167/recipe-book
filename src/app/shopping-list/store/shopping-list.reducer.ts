import { Ingredient } from "src/app/shared/ingredient.model";

import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    'ingredients':Ingredient[],
    'editedIngredient':Ingredient,
    'editedIngredientIndex':number
}

const initialState: State ={
'ingredients':[new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
'editedIngredient':null,
'editedIngredientIndex':-1
} 

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        
        case ShoppingListActions.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex:-1
            };
        
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredientsAfterDelete = state.ingredients.filter((ingredient, index) => index !== action.payload);
            return {
                ...state,
                ingredients: ingredientsAfterDelete,
                editedIngredient: null,
                editedIngredientIndex:-1
            };
        case ShoppingListActions.START_EDIT:
            return{
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex:action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return{
                ...state,
                editedIngredient: null,
                editedIngredientIndex:-1
            }
        
        default : return state;
    }
}