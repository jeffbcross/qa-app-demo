import {Component} from 'angular2/core';
import {FbLogin} from './components/fb-login/fb-login';
import {Question} from './components/question/question';
import {QuestionList} from './components/question-list/question-list';

@Component({
  selector: 'angularfire-demo-2851-app',
  providers: [],
  templateUrl: 'app/angularfire-demo-2851.html',
  directives: [FbLogin, Question, QuestionList],
  pipes: []
})
export class AngularfireDemo2851App {
}
