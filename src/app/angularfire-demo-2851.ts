import {Component} from 'angular2/core';
import {FbLogin} from './components/fb-login/fb-login';
import {Question} from './components/question/question';

@Component({
  selector: 'angularfire-demo-2851-app',
  providers: [],
  templateUrl: 'app/angularfire-demo-2851.html',
  directives: [FbLogin, Question],
  pipes: []
})
export class AngularfireDemo2851App {
  defaultMeaning: number = 42;

  meaningOfLife(meaning) {
    console.log('meaning', meaning);
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
