import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UploadFilesService } from '../../shared/upload-files.service'

import { Provider } from './provider';


@Injectable()
export class ProviderService {


  providersCollection: AngularFirestoreCollection<Provider>;
  providers: Observable<Provider[]>;
  providerDoc: AngularFirestoreDocument<Provider>;

  userId: any;

  constructor(private afs: AngularFirestore, private uploadFiles: UploadFilesService) {

    //cuando el user se loguea se guarda localmente el uid, para luego cargar los providers de este usuario
    this.userId = localStorage.getItem('uid');

    //aqui esta la consulta, este codigo fue ctrl + C -> ctrl + V de algun lugar, con minimos cambios
    //this.providersCollection = this.afs.collection('providers/', ref => ref.where('userId', '==', `${this.userId}`));
    this.providersCollection = this.afs.collection(`providers/${this.userId}/list`);

    //aqui hay una magia, en este momento historico no entiendo bien esta parte pero eso pasa en los tiempo modernos ;-) lo que importa es que funciona
    this.providers = this.providersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Provider;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProviders() {
    return this.providers;
  }

  getProviderDetails(id) {
    //this.providerDoc = this.afs.doc(`providers/${id}`);
    this.providerDoc = this.afs.doc(`providers/${this.userId}/list/${id}`);
    return this.providerDoc;
  }

  addProvider(provider: Provider, files: FileList) {
    provider.userId = this.userId;
    this.providersCollection.add(provider).then((result) => {
      //localStorage.setItem(localStorage.getItem('uid'), result.id);
      this.uploadFiles.uploadFiles(files, result.id);
    });
  }

  deleteProvider(id: string) {
    this.providerDoc = this.afs.doc(`providers/${this.userId}/list/${id}`);
    this.providerDoc.delete();
  }

  updateProvider(provider: Provider) {
    this.providerDoc = this.afs.doc(`providers/${this.userId}/list/${provider.id}`);
    this.providerDoc.update(provider);
  }
}