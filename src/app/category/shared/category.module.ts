import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ListCategoriesComponent } from '../list-categories/list-categories.component';

@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ AddCategoryComponent, EditCategoryComponent, ListCategoriesComponent ]
})
export class CategoryModule { }
