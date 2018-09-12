import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Upload } from '../../shared/upload'
import { UploadFilesService } from '../../shared/upload-files.service'
import { ProviderService } from '../../provider/shared/provider.service'

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})

export class ImageDialogComponent implements OnInit {

  image: Upload
  provider: any

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFilesService: UploadFilesService,
    private providerService: ProviderService) {
    this.image = data.image
    this.provider = data.provider
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resume() {
    this.dialogRef.close();
  }

  updateProvider(){
    this.provider.image = this.image.url
    this.providerService.updateProvider(this.provider)
    this.dialogRef.close();
  }

  deleteImage() {
    console.log(this.provider.id)
    console.log(this.image.id)
    console.log(this.image.name)
    this.uploadFilesService.deleteFile(this.provider.id, this.image.id, this.image.name, this.image.dir)
  }

}
