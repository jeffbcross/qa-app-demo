import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';

import {Auth} from '../../services/auth-state/auth-state';

@Component({
  selector: 'fb-login',
  template: `
    <div [ngSwitch]="(auth.loginState | async).status">
      <button *ngSwitchWhen="'NotLoggedIn'" (click)="auth.login()">Login</button>
      <span *ngSwitchWhen="'LoggedIn'">
        Welcome! <button (click)="auth.logout()">Log out</button>
      </span>
    </div>
  `,
  styleUrls: ['app/components/fb-login/fb-login.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class FbLogin {

  constructor(public auth:Auth) {}
}


