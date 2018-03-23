import { Component, OnInit } from '@angular/core';

import { ProviderService } from '../shared/provider.service';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Router } from '@angular/router'

import * as _ from 'lodash'

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.css'],
  providers: [ProviderService]
})
export class ListProvidersComponent implements OnInit {

  providers: any;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private providerService: ProviderService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentUser.subscribe(user => {
      
      if (!_.isEmpty(_.intersection(['admin'], user.roles))) {
        this.providerService.initAdmin()
      }
      else{
        this.providerService.init(user.id)
      }
      
      this.providerService.getProviders().subscribe(providers => {
        this.providers = providers;
      })
    })
  }

  editProvider(provider) {
    this.broadcastOjectService.broadcastProvider(provider);
    this.router.navigate(['/edit-provider']);
  }

  addProvider() {
    //this.broadcastOjectService.broadcastProvider(provider);
    this.router.navigate(['/add-provider']);
  }


  updateProvider(provider) {
    this.providerService.updateProvider(provider.id);
    this.router.navigate(['/list-providers']);
  }

  deleteProvider(provider) {
    this.providerService.deleteProvider(provider.id);
  }

  addCategory(provider) {   
    this.broadcastOjectService.broadcastProvider(provider)   
    this.router.navigate(['/list-categories']);
  }

  orders(provider){
    this.router.navigate(['/list-orders', provider.id]);        
  }

}
