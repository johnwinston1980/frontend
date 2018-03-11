import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Order } from '../shared/order'

@Injectable()
export class OrderService {

  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;

  /*imagesCollection: AngularFirestoreCollection<Upload>;
  images: Observable<Upload[]>;*/

  providerId: string;
  

  constructor(private afs: AngularFirestore) { }


  init(providerId: string) {
    this.providerId = providerId;
    

    this.ordersCollection = this.afs.collection(`orders/${this.providerId}/list`);
    
    this.orders = this.ordersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getOrders() {
    return this.orders
  }

}