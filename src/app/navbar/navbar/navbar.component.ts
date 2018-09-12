import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash'

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { User } from '../../shared/user'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayName: string;
  userAuthState: Observable<firebase.User>;
  user: User;

  constructor(private broadcastOjectService: BroadcastObjectService,
    private afAuth: AngularFireAuth, private router: Router) {
    this.userAuthState = afAuth.authState;
  }

  ngOnInit() {
    var savedUser = JSON.parse(localStorage.getItem('user'))
    if (!_.isEmpty(savedUser)) {
      this.user = savedUser;
      this.broadcastOjectService.broadcastUser(savedUser);
    }

    this.broadcastOjectService.currentUser.subscribe(user => {
      this.displayName = user.displayName
      this.user = user;
    })

  }

  logout() {
    this.afAuth.auth.signOut().then((success) => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
    ).catch((err) => {
      console.log(err);
    });
    //this.fM.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
  }

  isCashier(): boolean {
    return !_.isEmpty(_.intersection(['cashier'], this.user.roles))
  }

  isAdmin(): boolean {
    return !_.isEmpty(_.intersection(['admin', 'provider'], this.user.roles))
  }

}