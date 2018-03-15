import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component'
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module'

import { AgmCoreModule } from '@agm/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

//Modules
//import { NavbarModule } from './navbar/shared/navbar.module';
import { ProviderModule } from './provider/shared/provider.module';
import { CategoryModule } from './category/shared/category.module';
import { ProductModule  } from './product/shared/product.module'
import { OrderModule  } from './order/shared/order.module'
import { DashboardModule  } from './dashboard/shared/dashboard.module'

//if not here no maps, couldnt take out to a module
import { AddProviderComponent } from './provider/add-provider/add-provider.component';

import { UploadFilesService } from './shared/upload-files.service';
import { BroadcastObjectService } from './shared/broadcast-object.service';

import { EditProviderComponent } from './provider/edit-provider/edit-provider.component'
import { ListProvidersComponent } from './provider/list-providers/list-providers.component'
import { ListOrdersComponent } from './order/list-orders/list-orders.component';

import {TimeLeftPipe} from './order/shared/minuteLeft.pipe' 

import {  
  DialogComponent,
  IconsComponent,
  PopupComponent,
  PopupcontainerComponent,
  SlidemenuComponent
 } from './Components';

@NgModule({
  declarations: [
    AppComponent,  
    NavbarComponent,
    AddProviderComponent, 
    EditProviderComponent,
    ListProvidersComponent,     
    LoginComponent,
    DialogComponent,
    IconsComponent,
    PopupComponent,
    PopupcontainerComponent,
    ListOrdersComponent,
    SlidemenuComponent,
    TimeLeftPipe             
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD_TkIqjNZTh2o0KmV10tQ7G1tIPCrdEU4",
      libraries: ["places"]
    }),
    ProviderModule,
    CategoryModule,    
    ProductModule,
    OrderModule,
    DashboardModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,  
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [UploadFilesService, BroadcastObjectService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }