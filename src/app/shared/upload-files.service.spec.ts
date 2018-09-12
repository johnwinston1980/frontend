import { TestBed, inject } from '@angular/core/testing';

import { UploadFilesService } from './upload-files.service';

describe('UploadFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadFilesService]
    });
  });

  it('should be created', inject([UploadFilesService], (service: UploadFilesService) => {
    expect(service).toBeTruthy();
  }));
});
