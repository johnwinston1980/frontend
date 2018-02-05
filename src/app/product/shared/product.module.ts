import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddProductComponent } from '../add-product/add-product.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ AddProductComponent, ListProductsComponent, EditProductComponent ]
})
export class ProductModule { }
