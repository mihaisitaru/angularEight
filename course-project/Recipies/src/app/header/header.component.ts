import { Component, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subject, Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;
  isFetching = false;
  loadedRecipes: Recipe[] = [];
  error = new Subject<string>();
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.onFetchRecipes();
      }
    });
  }

  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.isFetching = true;
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
