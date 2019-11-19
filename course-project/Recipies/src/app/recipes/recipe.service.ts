import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Homemade fish fingers',
      '*Can be frozen uncooked',
      'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--104455_12.jpg',
      [
        new Ingredient('egg, beaten', 1),
        new Ingredient('gr of white breadcrumb, made from day-old bread', 85),
        new Ingredient('zest and juice lemon', 1),
        new Ingredient('tsp dried oregano', 1),
        new Ingredient('tbsp olive oil', 1),
        new Ingredient(
          'gr of skinless sustainable white fish, sliced into 12 strips',
          400
        ),
        new Ingredient('tbsp mayonnaise', 4),
        new Ingredient('gr of frozen pea, cooked and cooled', 140),
        new Ingredient('gr of young leaf spinach', 100)
      ]
    ),
    new Recipe(
      'Cheesy corn cakes',
      '*Freezable',
      'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1139_11.jpg',
      [
        new Ingredient('g self-raising flour', 175),
        new Ingredient('tsp baking powder', 1),
        new Ingredient('eggs', 2),
        new Ingredient('ml milk', 125),
        new Ingredient('g can sweetcorn, drained', 198),
        new Ingredient('g mature cheddar, grated', 100),
        new Ingredient('tbsp chopped chives', 2),
        new Ingredient('tsp sunflower oil', 2),
        new Ingredient('ripe tomatoes, finely chopped', 2),
        new Ingredient('tbsp organic tomato ketchup', 2)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
