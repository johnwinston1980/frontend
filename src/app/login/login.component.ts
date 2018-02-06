import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { BroadcastObjectService } from '../shared/broadcast-object.service'

import * as firebase from 'firebase/app';
import { LoginService } from './shared/login.service'
import { User } from '../shared/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  user: User = {
    /*id: '',
    username: '',
    roles: [],*/
  }

  constructor(private broadcastOjectService: BroadcastObjectService,
    private loginService: LoginService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      this.user.id = success.user.uid;
      this.user.displayName = success.user.displayName

      var user = new String(success.user.email)
      this.user.username = user.substring(0, user.indexOf('@'))

      this.redirect(this.user.username);
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  redirect(username) {
    var docRef = this.loginService.getUserDetails(username);

    docRef.ref.get().then((doc) => {
      if (doc.exists) {
        this.user.roles = doc.data().roles;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.broadcastOjectService.broadcastUser(this.user);
        //check where to redirect
      }
      else {
        console.log('no role for this user in datebase')
      }
    })
  }  
}