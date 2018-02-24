import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UploadFilesService } from '../../shared/upload-files.service'

import { Category } from './category';

@Injectable()
export class CategoryService {

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;
  categoryDoc: AngularFirestoreDocument<Category>;

  providerId: string;

  constructor(private afs: AngularFirestore,
    private uploadFiles: UploadFilesService) {
  }

  init(providerId: string) {
    this.providerId = providerId;
    this.categoriesCollection = this.afs.collection(`categories/${this.providerId}/list`);
    this.categories = this.categoriesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  getCategories() {
    return this.categories;
  }

  getCategoryDetails(id) {
    this.categoryDoc = this.afs.doc(`categories/${this.providerId}/list/${id}`);
    return this.categoryDoc;
  }

  addCategory(category: Category, files: FileList) {
    category.providerId = this.providerId;
    this.categoriesCollection.add(category).then((result) => {
      this.uploadFiles.uploadFiles(files, result.id).then((url) => {
        this.categoryDoc = this.afs.doc(`categories/${this.providerId}/list/${result.id}`);
        category.image = String(url)
        this.categoryDoc.update(category);
      }).then((error) => {
        console.log(error)
      })
    });
  }

  deleteCategory(id: string) {
    this.categoryDoc = this.afs.doc(`categories/${this.providerId}/list/${id}`);
    this.categoryDoc.delete();
  }

  updateCategory(category: Category) {
    this.categoryDoc = this.afs.doc(`categories/${this.providerId}/list/${category.id}`);
    this.categoryDoc.update(category);
  }
}