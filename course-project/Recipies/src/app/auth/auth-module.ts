import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/directives.module';

@NgModule({
  declarations: [AuthComponent, AlertComponent, LoadingSpinnerComponent],
  imports: [FormsModule, ReactiveFormsModule, AuthRoutingModule, CommonModule, DirectivesModule],
  exports: [AuthComponent, AlertComponent, LoadingSpinnerComponent],
  entryComponents: [AlertComponent]
})
export class AuthModule {}
