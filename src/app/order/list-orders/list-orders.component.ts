import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../shared/user'

import { OrderService } from '../shared/order.service'

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [OrderService]
})

export class ListOrdersComponent implements OnInit {

  user: User;
  providerId: string;
  orders: any;
  _order: any;


  constructor(
    private broadcastOjectService: BroadcastObjectService,
    private orderService: OrderService,
    private router: Router, private route: ActivatedRoute) {

    this.providerId = this.route.snapshot.params['provId']
    this.orderService.init(this.providerId)

  }

  ngOnInit() {

    this.broadcastOjectService.currentUser.subscribe(user => {
      this.user = user;
    })
    this.orderService.getOrders().subscribe(orders => {
      console.log(orders)
      this.orders = orders
    })

  }

  ChangeStatus(order){
    this._order.status = 'ready';
    this.orderService.updateOrder(this.providerId,this._order);
  }


  getStatusClass(s){
    if(s==='pending'){
      return '_OrderStatus _pennding'
    }
    else if(s==='ready'){
      return '_OrderStatus _ready'
    }
    else{
      return '_OrderStatus _canceled'
    }
  }

}