import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Product } from '../shared/product'
import { ProductService } from '../shared/product.service'

import { Router } from '@angular/router'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [ProductService]
})
export class ListProductsComponent implements OnInit {

  products: any
  category: any
  provider: any

  constructor(private broadcastOjectService: BroadcastObjectService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
      this.broadcastOjectService.currentCategory.subscribe(category => {
        this.category = category;
        this.productService.init(this.provider.id, this.category.id);

        this.productService.getProducts().subscribe(products => {
          this.products = products;
        });

      })
    })
  }

  editProduct(product) {
    this.broadcastOjectService.broadcastProduct(product);
    this.router.navigate(['/edit-product']);
  }

  addProduct() {    
    this.router.navigate(['/add-product']);
  }

}