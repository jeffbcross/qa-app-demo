import {Component, Inject, Injectable, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';


@Injectable()
export class Auth {
  loginState:ReplaySubject<AuthStatus> = new ReplaySubject();
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef) {
    var auth = this._fbRef.getAuth();
    this.loginState.next({
      status: auth ? 'LoggedIn' : 'NotLoggedIn',
      auth
    });
    this._fbRef.onAuth(auth => {
      this.loginState.next({
        status: auth ? 'LoggedIn' : 'NotLoggedIn',
        auth
      });
    });
  }

  login() {
    this._fbRef.authWithOAuthPopup('github', (err, authData) => {
      if(err) this.loginState.error(err);
    });
  }

  logout() {
    this._fbRef.unauth();
  }
}

interface AuthStatus {
  status: string;
  auth: any;
}