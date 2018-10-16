import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { BroadcastObjectService } from '../shared/broadcast-object.service'

import * as firebase from 'firebase/app';
import { LoginService } from './shared/login.service'
import { User } from '../shared/user'

import * as _ from 'lodash'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {

  user: User = {}

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

      this.setUpUser(this.user.username);
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  /*
    aqui se busca y se guarda info del user que se acaba de loguear
  */ 
  setUpUser(username) {
    var docRef = this.loginService.getUserDetails(username);
    docRef.ref.get().then((doc) => {
      if (doc.exists) {
        this.user.roles = doc.data().roles;        
       
        //if for example user is cashier get appropriate data
        if(!_.isEmpty(doc.data().userId)){
          this.user.userId = doc.data().userId          
        }
        if(!_.isEmpty(doc.data().providerId)){
          this.user.providerId = doc.data().providerId          
        }
        
        //now save to localStorage
        localStorage.setItem('user', JSON.stringify(this.user));
        this.broadcastOjectService.broadcastUser(this.user);
        //check where to redirect
        this.redirect();
      }
      else {
        console.log('no role for this user in database')
      }
    })    
  }

  /*
  de aqui se redirecciona a la interfaz apropiada dependiendo del rol del user, interfaces que estan por implementarse
  */
  redirect() {
    if (!_.isEmpty(_.intersection(['admin'], this.user.roles))) {
      this.router.navigate(['/add-user'])
    }
    else if (!_.isEmpty(_.intersection(['provider'], this.user.roles))) {
      this.router.navigate(['/add-provider'])
    }
    else if (!_.isEmpty(_.intersection(['cashier'], this.user.roles))) {
      this.router.navigate(['/list-orders'])
    }
    else {
      console.log('redirect to an error page')
    }
  }

  /*
  dummy function
  */
 dummy(){   
 }

}