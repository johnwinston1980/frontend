import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Router, ActivatedRoute, Params} from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  displayName: string;
  
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    	this.user = afAuth.authState;      
      //console.log(this.user);           
  }

  ngOnInit() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           this.displayName = user.displayName;                      
          }        
      });   
      var dname = new String(localStorage.getItem('dname'))     
      if(dname.length > 0){
        this.displayName = localStorage.getItem('dname');
      }
  }
  

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      localStorage.setItem('uid', success.user.uid);
      localStorage.setItem('dname', success.user.displayName); 
      this.displayName = success.user.displayName;   
    	this.router.navigate(['/']);
    }
    ).catch((err) => {
    	console.log(err);
    });
  }

  logout() {
     this.afAuth.auth.signOut().then((success) => {
      localStorage.removeItem('uid');      
      localStorage.removeItem('dname');      
    	this.router.navigate(['/']);
    }
    ).catch((err) => {
    	console.log(err);
    });
     //this.fM.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
  }

}