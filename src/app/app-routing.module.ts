import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProviderComponent } from './provider/add-provider/add-provider.component'
import { ListProvidersComponent } from './provider/list-providers/list-providers.component'
import { EditProviderComponent } from './provider/edit-provider/edit-provider.component'
import { AddCategoryComponent } from './category/add-category/add-category.component'
import { ListCategoriesComponent } from './category/list-categories/list-categories.component'
import { EditCategoryComponent } from './category/edit-category/edit-category.component'
import { AddProductComponent } from './product/add-product/add-product.component'
import { ListProductsComponent } from './product/list-products/list-products.component'
import { EditProductComponent } from './product/edit-product/edit-product.component'


const routes: Routes = [
  { path: '', component: ListProvidersComponent },
  { path: 'add-provider', component: AddProviderComponent },
  { path: 'list-providers', component: ListProvidersComponent },
  { path: 'edit-provider', component: EditProviderComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-categories', component: ListCategoriesComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'edit-product', component: EditProductComponent },
  /*{ path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },*/
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [AuthGuard],
})
export class AppRoutingModule {}