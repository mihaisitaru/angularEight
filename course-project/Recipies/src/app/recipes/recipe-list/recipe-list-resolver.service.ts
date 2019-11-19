import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeListResolver implements Resolve<Recipe[]> {
    constructor(private recipeService: RecipeService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
        return this.recipeService.getRecipes();
    }
}
