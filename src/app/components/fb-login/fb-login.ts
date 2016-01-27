import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';

@Component({
  selector: 'fb-login',
  template: `
    <div [ngSwitch]="(loginState | async).status">
      <button *ngSwitchWhen="'NotLoggedIn'" (click)="login()">Login</button>
      <span *ngSwitchWhen="'LoggedIn'">
        Welcome! <button (click)="logout()">Log out</button>
      </span>
    </div>
  `,
  styleUrls: ['app/components/fb-login/fb-login.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class FbLogin {
  loginState:ReplaySubject<AuthStatus> = new ReplaySubject();
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef) {
    var auth = this._fbRef.getAuth();
    this.loginState.next({
      status: auth ? 'LoggedIn' : 'NotLoggedIn',
      auth
    });
    this._fbRef.onAuth(auth => {
      if (!auth) {
        this.loginState.next({
          status: 'NotLoggedIn',
          auth: null
        });
      } else {
        this.loginState.next({
          status: 'LoggedIn',
          auth: auth
        });
      }
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
