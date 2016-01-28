import {Component, Inject} from 'angular2/core';
import {FirebaseList, FirebaseObservable} from 'angularfire2/angularfire';
import {QuestionDetail} from '../question-detail/question-detail';




@Component({
  selector: 'question-list',
  template: `
    <question-detail class="row" [question]="question" *ngFor="#question of questions | async">
    </question-detail>
  `,
  providers: [FirebaseList('/questions')],
  directives: [QuestionDetail],
})
export class QuestionList {

  constructor(@Inject('/questions') public questions:FirebaseObservable<any>) {}

}
