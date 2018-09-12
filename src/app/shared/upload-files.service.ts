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

  private basePath: string = '';

  currentUpload: Upload = {
    dir: '',
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


  getImages() {
    return this.uploads
  }

  init(parentId, dir) {
    //this.uploadsCollection = this.afs.collection('uploads/' + parentId + '/images');
    this.basePath = dir

    this.uploadsCollection = this.afs.collection(`uploads/${parentId}/images/`);

    this.uploads = this.uploadsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  deleteFile(parentId, imageId, fileName, dir) {
    const storageRef = firebase.storage().ref();
    // Create a reference to the file to delete
    var desertRef = storageRef.child(`${dir}/${fileName}`);

    // Delete the file
    desertRef.delete().then(res => {
      // File deleted successfully
      console.log('File deleted successfully')
      this.uploadsDoc = this.afs.doc(`uploads/${parentId}/images/${imageId}`);
      this.uploadsDoc.delete();

    }).catch(function (error) {
      // Uh-oh, an error occurred!
      console.log('Uh-oh, an error occurred!')
      console.log(error)
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

  uploadFiles(fileList: FileList, parentId: string, dir: string) {

    this.init(parentId, dir);
    let filesIndex = _.range(fileList.length - 1)

    _.each(filesIndex, (idx) => {
      this.pushUpload(this.currentUpload, fileList[idx])
    })

    //return Promise after saving last image
    return new Promise((resolve, reject) => {
      this.pushUploadPromise(this.currentUpload, fileList[fileList.length - 1]).then((result) => {
        console.log('url = ' + result)
        if (!_.isEmpty(result))
          resolve(result)
        else
          reject('Oops...something went wrong!')
      })
    })

  }

  pushUpload(upload: Upload, file: File) {
    const storageRef = firebase.storage().ref();

    let fileName = new Date().getTime() + '.jpg'
    //let path = `${this.basePath}/${file.name}`;
    let path = `${this.basePath}/${fileName}`;
    
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
        upload.name = fileName
        upload.dir = this.basePath
        upload.createdAt = new Date();
        this.addUpload(upload)
      }
    );
  }

  pushUploadPromise(upload: Upload, file: File) {
    return new Promise((resolve, reject) => {
      let url
      const storageRef = firebase.storage().ref();

      let fileName = new Date().getTime() + '.jpg'
      //let path = `${this.basePath}/${file.name}`;
      let path = `${this.basePath}/${fileName}`;

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
          upload.name = fileName
          upload.dir = this.basePath
          upload.createdAt = new Date();
          this.addUpload(upload)
          url = upload.url
          if (!_.isEmpty(url))
            resolve(url)
          else
            reject('')
        }
      );
    })
  }
}