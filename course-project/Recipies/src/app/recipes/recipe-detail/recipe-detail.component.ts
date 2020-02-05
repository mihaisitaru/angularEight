import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = +params.id;
      if (this.id > this.recipeService.getRecipes().length - 1) {
        this.router.navigate(['/recipes']);
      }
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addIngredientToShoppingList(index: number) {
    this.shoppingListService.addIngredient(this.recipe.ingredients[index]);
    this.recipe.ingredients[index].isInShoppingList = true;
  }

  removeIngredientFromShoppingList(index: number) {
    this.shoppingListService.removeIngredient(this.recipe.ingredients[index]);
    this.recipe.ingredients[index].isInShoppingList = false;
  }

  allToShoppingList() {
    for (const ingredient of this.recipe.ingredients) {
      this.shoppingListService.addIngredient(ingredient);
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
