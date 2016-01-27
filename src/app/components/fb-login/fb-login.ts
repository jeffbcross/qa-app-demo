import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';

@Component({
  selector: 'fb-login',
  template: `
    <div [ngSwitch]="loginState | async">
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
  loginState:ReplaySubject<string> = new ReplaySubject();
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef) {
    this.loginState.next(this._fbRef.getAuth() && 'LoggedIn' || 'NotLoggedIn');
    this._fbRef.onAuth(state => {
      if (!state) {
        this.loginState.next('NotLoggedIn');
      } else {
        this.loginState.next('LoggedIn');
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
