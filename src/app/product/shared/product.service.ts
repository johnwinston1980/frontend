import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UploadFilesService } from '../../shared/upload-files.service'

import { Product } from './product';

@Injectable()
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  providerId: string;
  categoryId: string;

  constructor(private afs: AngularFirestore,
    private uploadFiles: UploadFilesService) { }


  init(providerId: string, categoryId: string) {
    this.providerId = providerId;
    this.categoryId = categoryId;

    this.productsCollection = this.afs.collection(`products/${this.providerId}/list/${this.categoryId}/list`);
    this.products = this.productsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProducts() {
    return this.products;
  }

  getProductDetails(id) {
    this.productDoc = this.afs.doc(`products/${this.providerId}/list/${this.categoryId}/list/${id}`);
    return this.productDoc;
  }

  addProduct(product: Product, files: FileList) {
    product.providerId = this.providerId;
    product.categoryId = this.categoryId;
    this.productsCollection.add(product).then((result) => {
      this.uploadFiles.uploadFiles(files, result.id).then((url) => {
        this.productDoc = this.afs.doc(`products/${this.providerId}/list/${this.categoryId}/list/${result.id}`);
        product.image = String(url)
        this.productDoc.update(product);
      }).then((error) => {
        console.log(error)
      })
    });
  }   

  deleteProduct(id: string) {
    this.productDoc = this.afs.doc(`products/${this.providerId}/list/${this.categoryId}/list/${id}`);
    this.productDoc.delete();
  }

  updateProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${this.providerId}/list/${this.categoryId}/list/${product.id}`);
    this.productDoc.update(product);
  }
}