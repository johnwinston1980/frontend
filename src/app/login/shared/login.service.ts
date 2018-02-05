import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../../shared/user';

@Injectable()
export class LoginService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) { 
    
  }

  init(username){
    this.usersCollection = this.afs.collection(`users/${username}/roles`);
    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  /*getUserDetails(username) {
    this.userDoc = this.afs.doc(`roles/${username}`);
    this.users.
    return this.userDoc.valueChanges();
  }*/

}