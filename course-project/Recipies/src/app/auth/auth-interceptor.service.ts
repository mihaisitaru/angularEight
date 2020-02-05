import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    baseUrl = 'https://angular8-course-project-7d5d5.firebaseio.com/recipes.json';
    constructor(private authService: AuthService,
                private recipeService: RecipeService,
                private http: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            })
          );
    }
}
