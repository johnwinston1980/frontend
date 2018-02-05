import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

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

  user: any;

  constructor(private loginService: LoginService, private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      localStorage.setItem('uid', success.user.uid);
      localStorage.setItem('dname', success.user.displayName);

      //this.router.navigate(['/']);   
      this.redirect(success);   
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  redirect(success){
    this.user = this.loginService.getUserDetails(success.user.user);
    
    console.log(this.user);

    /*if(this.user == 'admin'){

    }*/
  }

}