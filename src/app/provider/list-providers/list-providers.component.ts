import { Component, OnInit } from '@angular/core';

import { ProviderService } from '../shared/provider.service';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Router } from '@angular/router'

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
      this.providerService.init(user.id)
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

}
