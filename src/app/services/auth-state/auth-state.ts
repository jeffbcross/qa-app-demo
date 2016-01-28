import {Component, Inject, Injectable, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';


@Injectable()
export class Auth {
  loginState:ReplaySubject<AuthStatus> = new ReplaySubject();
  private _auth;
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef) {
    var auth = this._auth = this._fbRef.getAuth();
    console.log(this._fbRef.getAuth())
    this.loginState.next({
      status: auth ? 'LoggedIn' : 'NotLoggedIn',
      auth
    });
    this._fbRef.onAuth(auth => {
      this._auth = auth;
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

  get auth():any {
    return this._auth;
  }
}

interface AuthStatus {
  status: string;
  auth: any;
}