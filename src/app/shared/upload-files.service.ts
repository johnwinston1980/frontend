import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import * as _ from "lodash";
import { Upload } from './upload';


@Injectable()
export class UploadFilesService {

  private basePath: string = '/uploads';

  currentUpload: Upload = {
    name: '',
    url: '',
    progress: 0,
    createdAt: null    
  }

  uploadsCollection: AngularFirestoreCollection<Upload>;
  uploads: Observable<Upload[]>;
  uploadsDoc: AngularFirestoreDocument<Upload>;

  constructor(private afs: AngularFirestore) {

    //this.uploadsCollection = this.afs.collection('uploads/', ref => ref.where('providerId', '==', ''));
   /* this.uploadsCollection = this.afs.collection('uploads/');

    this.uploads = this.uploadsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });*/

  }

  init(parentId){
    this.uploadsCollection = this.afs.collection('uploads/'+parentId+'/images');

    this.uploads = this.uploadsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });        
  }

  addUpload(upload: Upload) {
    this.uploadsCollection.add(upload);
  }

  /*getFiles(ownerId) {
    return this.afs.collection('uploads/', ref => ref.where('ownerId', '==', `${ownerId}`)).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }*/

  uploadFiles(fileList: FileList, parentId: string) {
    this.init(parentId);
    let filesIndex = _.range(fileList.length)
    _.each(filesIndex, (idx) => {      
      this.pushUpload(this.currentUpload, fileList[idx])
    }
    )
  }

  pushUpload(upload: Upload, file: File) {
    const storageRef = firebase.storage().ref();
    let path = `${this.basePath}/${file.name}`;
    const uploadTask = storageRef.child(path).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (uploadTask.snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, (error) => {

      }, () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = file.name
        upload.createdAt = new Date();
        this.addUpload(upload)
      }
    );
  }
}