import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { CategoryService } from '../shared/category.service'

import { Category } from '../shared/category';


@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [CategoryService]
})

export class AddCategoryComponent implements OnInit {

  selectedFiles: FileList;

  category: Category = {
    name: ''
  }

  provider: any;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    //this.providerId = this.route.snapshot.params['provId']
  }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider
      this.categoryService.init(this.provider.id);  
    })      
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadMulti() {
    this.categoryService.addCategory(this.category, this.selectedFiles);
    this.router.navigate(['/list-categories', this.provider.id]);
  }
}