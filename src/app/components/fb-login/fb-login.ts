import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';

@Component({
  selector: 'fb-login',
  template: `
    <button (click)="login()">Login</button>
  `,
  styleUrls: ['app/components/fb-login/fb-login.css'],
  providers: [],
  directives: [],
  pipes: [],
  outputs: ['loginState']
})
export class FbLogin {
  @Output('loginState') loginState:EventEmitter<string> = new EventEmitter();
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef) {

  }

  login() {
    this._fbRef.authWithOAuthPopup('github', (err, authData) => {
      console.log(err, authData);
      this.loginState.emit('logged in');
    });
    console.log('now what?');
  }

}
