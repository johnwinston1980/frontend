import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { User } from '../../shared/user'

@Injectable()
export class ProviderGuard implements CanActivate {

  user: User;

  constructor(private broadcastOjectService: BroadcastObjectService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.check(state.url);
  }

  check(url): boolean {

    var allowedRoles = ['provider', 'admin', 'cashier'];
    var authorized = false;

    this.broadcastOjectService.currentUser.subscribe(user => {
      this.user = user;

      switch (url) {
        case '/add-provider':
          authorized = !_.isEmpty(_.intersection(allowedRoles, this.user.roles))
          break;
        case '/edit-provider':
          authorized = !_.isEmpty(_.intersection(allowedRoles, this.user.roles))
          break;
        case '/list-providers':
          authorized = !_.isEmpty(_.intersection(allowedRoles, this.user.roles))
          break;
      }
    })

    return authorized;
  }
}