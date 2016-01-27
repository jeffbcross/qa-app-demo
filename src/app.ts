import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {AngularfireDemo2851App} from './app/angularfire-demo-2851';
import {FIREBASE_PROVIDERS, DEFAULT_FIREBASE} from 'angularfire2/angularfire';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

enableProdMode();

bootstrap(AngularfireDemo2851App, [
  provide(DEFAULT_FIREBASE, {
    useValue: 'https://deploytest.firebaseio.com'
  }),
  FIREBASE_PROVIDERS
]);
