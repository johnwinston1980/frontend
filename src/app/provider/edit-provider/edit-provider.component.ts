import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Provider } from '../shared/provider'
import { ProviderService } from '../shared/provider.service'

import { Router } from '@angular/router'

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css'],
  providers: [ProviderService]
})
export class EditProviderComponent implements OnInit {

  provider: Provider;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private providerService: ProviderService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentProvider.subscribe(provider => {
      this.provider = provider;
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
    this.router.navigate(['/list-categories']);
  }

}
