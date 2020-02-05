import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DropdownDirective,
        PlaceholderDirective
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        DropdownDirective,
        PlaceholderDirective
    ]
})
export class DirectivesModule {}
