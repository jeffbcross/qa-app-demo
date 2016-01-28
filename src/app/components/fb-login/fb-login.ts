import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';
import {Auth} from '../../services/auth-state/auth-state';




@Component({
  selector: 'fb-login',
  template: `
    <div [ngSwitch]="(auth.loginState | async).status"
         class="collapse navbar-collapse">


      <button type="button"
              class="btn btn-default navbar-btn"
              *ngSwitchWhen="'NotLoggedIn'"
              (click)="auth.login()">
        Login
      </button>


      <span *ngSwitchWhen="'LoggedIn'">
        Welcome!
        <button type="button"
                class="btn"
                (click)="auth.logout()">
          Log out
        </button>
      </span>
    </div>
  `
})
export class FbLogin {
  constructor(public auth:Auth) {}
}


