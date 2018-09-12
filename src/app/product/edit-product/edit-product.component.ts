import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { ProductService } from '../shared/product.service'

import { Product } from '../shared/product'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService]
})

export class EditProductComponent implements OnInit {

  provider: any;
  category: any;
  product: Product; 

  constructor(private broadcastOjectService: BroadcastObjectService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentCategory.subscribe(category => {
      this.category = category;
      this.broadcastOjectService.currentProvider.subscribe(provider => {
        this.provider = provider;
        this.productService.init(this.provider.id, this.category.id);
      })
    })
    this.broadcastOjectService.currentProduct.subscribe(product => {
      this.product = product;
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.product);
    this.router.navigate(['/list-products']);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id);
    this.router.navigate(['/list-products']);
  }

}
