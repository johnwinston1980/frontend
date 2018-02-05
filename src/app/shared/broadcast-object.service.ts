import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Provider } from '../provider/shared/provider';
import { Category } from '../category/shared/category';
import { Product } from '../product/shared/product';
import { User } from './user'

@Injectable()
export class BroadcastObjectService {

  provider: Provider = {}
  category: Category = {}
  product: Product = {}
  user: User = {};

  private userSource = new BehaviorSubject<User>(this.user);
  currentUser = this.userSource.asObservable();

  private providerSource = new BehaviorSubject<Provider>(this.provider);
  currentProvider = this.providerSource.asObservable();

  private categorySource = new BehaviorSubject<Category>(this.category);
  currentCategory = this.categorySource.asObservable();

  private productSource = new BehaviorSubject<Product>(this.product);
  currentProduct = this.productSource.asObservable();

  constructor() { }

  broadcastUser(user: User){
    this.userSource.next(user);    
  }

  broadcastProvider(provider: Provider){
    this.providerSource.next(provider);    
  }

  broadcastCategory(category: Category){
    this.categorySource.next(category);    
  }

  broadcastProduct(product: Product){
    this.productSource.next(product);    
  }
}