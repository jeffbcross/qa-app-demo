import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {AngularfireDemo2851App} from './app/angularfire-demo-2851';
import {FIREBASE_PROVIDERS, DEFAULT_FIREBASE} from 'angularfire2/angularfire';

enableProdMode();

bootstrap(AngularfireDemo2851App, [
  provide(DEFAULT_FIREBASE, {
    useValue: 'https://deploytest.firebaseio.com/'
  }),
  FIREBASE_PROVIDERS
]);
