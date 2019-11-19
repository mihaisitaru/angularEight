import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;
  startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(
    private renderer: Renderer2,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm(form);
  }

  onDelete(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.resetForm(form);
  }

  private resetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
  }

  onReset() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }
}
