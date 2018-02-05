import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { ProductService } from '../shared/product.service'

import { Provider } from '../../provider/shared/provider';
import { Category } from '../../category/shared/category';
import { Product } from '../shared/product'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService]
})

export class AddProductComponent implements OnInit {

  selectedFiles: FileList;

  product: Product = {
    name: ''
  }

  provider: Provider;
  category: Category;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
      this.broadcastOjectService.currentCategory.subscribe(category => {
        this.category = category;
        this.productService.init(this.provider.id, this.category.id);
      })
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadMulti() {
    this.productService.addProduct(this.product, this.selectedFiles);
    this.router.navigate(['/list-products']);
  }
}