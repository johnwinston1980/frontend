import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Category } from '../shared/category'
import { CategoryService } from '../shared/category.service'

import { ActivatedRoute, Router } from '@angular/router'

import * as _ from 'lodash'

import { User } from '../../shared/user'

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [CategoryService]
})
export class ListCategoriesComponent implements OnInit {

  categories: any;
  providerId: any;
  user: User;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    this.providerId = this.route.snapshot.params['provId']
  }

  ngOnInit() {
    this.categoryService.init(this.providerId);
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
    this.broadcastOjectService.currentUser.subscribe( user => {
      this.user = user;
    })
  }

  editCategory(category) {
    this.broadcastOjectService.broadcastCategory(category);
    this.router.navigate(['/list-products']);
  }

  addCategory() {
    //this.broadcastOjectService.broadcastProvider(provider);
    this.router.navigate(['/add-category']);
  }

  isProvider(): boolean{
    return !_.isEmpty(_.intersection(['provider'], this.user.roles));
  }

}