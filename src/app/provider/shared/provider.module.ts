import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//import { AddProviderComponent } from '../add-provider/add-provider.component';
import { EditProviderComponent } from '../edit-provider/edit-provider.component'
import { ListProvidersComponent } from '../list-providers/list-providers.component'

import {ProviderGuard} from '../shared/provider.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditProviderComponent, ListProvidersComponent],
  providers: [ ProviderGuard ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class ProviderModule { }
