import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";

import { AgmCoreModule } from "@agm/core";
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { Provider } from '../shared/provider';
import { Address } from '../shared/address';

import { Router } from '@angular/router';

import { ProviderService } from '../shared/provider.service';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css'],
  providers: [ProviderService]
})

export class AddProviderComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  submitted = false

  public address: Address = {
    number: ''
  }

  public searchControl: FormControl;
  public zoom: number;

  name: any;
  selectedFiles: FileList;

  provider: Provider = {
    name: ''
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private providerService: ProviderService,
    private broadcastOjectService: BroadcastObjectService) { }

  ngOnInit() {

    this.broadcastOjectService.currentUser.subscribe(user => {
      this.providerService.init(user.id);
    })

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;


    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.address.formatted_address = place.formatted_address;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.address.lat = place.geometry.location.lat();
          this.address.lng = place.geometry.location.lng();
          this.zoom = 8;

          this.latitude = this.address.lat;
          this.longitude = this.address.lng;

          this.provider.address = this.address;

        });
      });
    });

  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadMulti() {
    this.providerService.addProvider(this.provider, this.selectedFiles);
    this.router.navigate(['/list-providers']);
  }

  onSubmit() {
    this.uploadMulti()
    this.submitted = true;
  }

}