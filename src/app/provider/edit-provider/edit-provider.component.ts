import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Provider } from '../shared/provider'
import { ProviderService } from '../shared/provider.service'

import { MatDialog, MatDialogRef } from '@angular/material'

import { Router } from '@angular/router'
import { UploadFilesService } from '../../shared/upload-files.service'

import { ImageDialogComponent } from '../../dialogs/image-dialog/image-dialog.component'

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css'],
  providers: [ProviderService, UploadFilesService, MatDialog]
})

export class EditProviderComponent implements OnInit {

  provider: Provider
  images: any
  selectedFiles: FileList;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private providerService: ProviderService,
    private router: Router,
    public dialog: MatDialog,
    private uploadFilesService: UploadFilesService
  ) { }

  ngOnInit() {
    this.broadcastOjectService.currentUser.subscribe(user => {
      this.providerService.init(user.id);
    })

    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
      this.uploadFilesService.init(this.provider.id, 'providers')
      this.uploadFilesService.getImages().subscribe(images => {
        this.images = images
      })
    })

  }

  updateProvider() {
    this.providerService.updateProvider(this.provider);
    this.router.navigate(['/list-providers']);
  }

  deleteProvider(provider) {
    this.providerService.deleteProvider(provider.id);
  }

  addCategory() {
    this.router.navigate(['/list-categories', this.provider.id]);
  }

  orders() {
    this.router.navigate(['/list-orders', this.provider.id]);
  }

  detectFiles(event) {    
    this.uploadFilesService.uploadFiles(event.target.files, this.provider.id, 'providers').then((url) => {   
      console.log(url)      
    })
  }   

  showImage(image) {
    let dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '650px',
      data: { image: image, provider: this.provider }
    });

    /*dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([''])
    }) */
  }

}
