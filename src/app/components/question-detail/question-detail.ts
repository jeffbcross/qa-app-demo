import {Component, Input} from 'angular2/core';


@Component({
  selector: 'question-detail',
  templateUrl: 'app/components/question-detail/question-detail.html',
  styles: ['div>div {border:1px solid #ccc}', 'button.expand {float:right;}'],
  providers: [],
  directives: [],
  pipes: []
})
export class QuestionDetail {
  @Input('question') question:any;
  expanded:boolean = false;
  constructor() {}

}
