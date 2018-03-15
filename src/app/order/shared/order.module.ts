import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListOrdersComponent } from '../list-orders/list-orders.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
  ],
  declarations: [  ]
})
export class OrderModule { }
