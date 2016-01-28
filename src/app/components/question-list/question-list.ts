import {Component, Inject} from 'angular2/core';
import {FirebaseList, FirebaseObservable} from 'angularfire2/angularfire';
import {QuestionDetail} from '../question-detail/question-detail';




@Component({
  selector: 'question-list',
  template: `
    <ul class="list-group">
      <question-detail class="list-group-item" [question]="question" *ngFor="#question of questions | async">
      </question-detail>
    </ul>
  `,
  providers: [FirebaseList('/questions')],
  directives: [QuestionDetail],
})
export class QuestionList {

  constructor(@Inject('/questions') public questions:FirebaseObservable<any>) {}

}
