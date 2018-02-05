import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Category } from '../shared/category'
import { CategoryService } from '../shared/category.service'

import { Router } from '@angular/router'

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [CategoryService]
})
export class ListCategoriesComponent implements OnInit {

  categories: any;
  provider: any;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
      this.categoryService.init(this.provider.id);
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
      })
    })
  }

  editCategory(category) {
    this.broadcastOjectService.broadcastCategory(category);
    this.router.navigate(['/edit-category']);
  }

  addCategory() {
    //this.broadcastOjectService.broadcastProvider(provider);
    this.router.navigate(['/add-category']);
  }

}
