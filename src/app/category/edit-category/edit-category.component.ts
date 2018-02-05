import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Provider } from '../../provider/shared/provider'
import { Category } from '../shared/category'
import { CategoryService } from '../shared/category.service'

import { Router } from '@angular/router'

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [CategoryService]
})

export class EditCategoryComponent implements OnInit {

  provider: Provider;
  category: Category;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
      this.categoryService.init(provider.id);
    })
    this.broadcastOjectService.currentCategory.subscribe(category => {
      this.category = category;
    })
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category);
    this.router.navigate(['/list-categories']);
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.id);
    this.router.navigate(['/list-categories']);
  }

  addProduct() {
    this.router.navigate(['/list-products']);
  }

}
