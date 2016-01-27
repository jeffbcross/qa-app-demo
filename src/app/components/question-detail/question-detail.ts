import {AfterViewInit, Component, Inject, Input, ViewChild} from 'angular2/core';
import {Control, NgForm} from 'angular2/common';
import {PromiseObservable} from 'rxjs/observable/fromPromise';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';

@Component({
  selector: 'question-detail',
  templateUrl: 'app/components/question-detail/question-detail.html',
  styles: ['div.root {border:1px solid #ccc}', 'button.expand {float:right;}'],
  providers: [],
  directives: [],
  pipes: []
})
export class QuestionDetail implements AfterViewInit {
  @ViewChild('answerForm') answerForm:NgForm;
  @Input('question') question:any;
  expanded:boolean = false;
  lastAnswer: string;
  lastAnswerError: string;

  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef:any) {}

  countAnswers(question):number {
    var answers = this.getAnswers(question);
    if (!answers) return 0;
    return answers.length;
  }

  getAnswers(question): any[] {
    var answers = question.val().answers;
    if (!answers) return null;
    return Object.keys(answers).map((a, k) => {
      return answers[a]
    });
  }

  ngAfterViewInit () {
    this.answerForm.ngSubmit
      .map(_ => {
        var control = this.answerForm.form.controls['answer'];
        return {
          control,
          answer: control.value
        };
      })
      .flatMap((wrapper:ControlAndValue) => PromiseObservable
          .create(<Promise<any>>this._fbRef
            .child(`questions/${this.question.key()}/answers`)
            .push({
              answer: wrapper.answer
            })))
      .subscribe((wrapper:ControlAndValue) => {
        this.lastAnswer = wrapper.answer;
        this.lastAnswerError = '';
        wrapper.control.updateValue('');
      }, (err:string) => {
        this.lastAnswerError = err;
      })
  }
}

interface ControlAndValue {
  control: Control;
  answer: string;
}