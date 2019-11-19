import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private didIngredientsChange: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.onIngredientsChanged();
  }

  ngOnDestroy() {
    this.didIngredientsChange.unsubscribe();
  }

  onIngredientsChanged() {
    this.didIngredientsChange = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onRemoveIngredient(ingredient: Ingredient) {
    this.shoppingListService.removeIngredient(ingredient);
    this.onIngredientsChanged();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
