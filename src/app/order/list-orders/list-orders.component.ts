import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../shared/user'

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})

export class ListOrdersComponent implements OnInit {

  user: User;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastOjectService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  disableProduct() {    
    this.router.navigate([ '/list-categories', this.user.providerId ])
  }

}