import {Component, Inject} from 'angular2/core';
import {FirebaseList, FirebaseObservable} from 'angularfire2/angularfire';

@Component({
  selector: 'question-list',
  template: `
    <div class="row" *ngFor="#question of questions | async">
      {{question.val().question}}
    </div>
  `,
  styles: ['.row {font-weight: bold}'],
  providers: [FirebaseList('/questions')],
  directives: [],
  pipes: []
})
export class QuestionList {

  constructor(@Inject('/questions') public questions:FirebaseObservable<any>) {}

}
