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
  searchOrder:any;
  searchOrderDetail:any={id:'wqwruqwrqwrqwroiqglasidughiamsdogiugmiugnitbf92385623-52n9trmnvg,uw'};

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
      this.orders = orders
    })

  }

  ChangeStatus(order){
    this._order.status = 'ready';
    this.orderService.updateOrder(this.providerId,this._order);
  }

  cleanDetails(){
    this.searchOrder="";
    this.searchOrderDetail={id:'wqwruqwrqwrqwroiqglasidughiamsdogiugmiugnitbf92385623-52n9trmnvg,uw'};
  }
  getOrderDetail(){    
    let _ss = this.orders.filter(d=>{return d.id===this.searchOrder}); 
    console.log(_ss)
    if(_ss.length>0){
      this.searchOrderDetail = _ss[0];
    }    
  }

  getOrderStatusTitle(s){
    if(s && s.status){
      if(s.status==='pending'){
        return ' Are you want confirm the order is ready'
      }
      else if(s.status==='ready'){
        return 'This order is ready to pick up'
      }
    }else{
      return '';
    }
  }
  getOrderStatusPending(s){
    if(s && s.status){
      if(s.status==='pending'){
        return true
      }
      else {
        return false
      }
    }else{
      return false;
    }
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