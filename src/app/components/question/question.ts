import {AfterViewInit, Component, Inject, ViewChild} from 'angular2/core';
import {NgForm, Control} from 'angular2/common';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {PromiseObservable} from 'rxjs/observable/fromPromise';

@Component({
  selector: 'question',
  templateUrl: 'app/components/question/question.html',
  styleUrls: ['app/components/question/question.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Question implements AfterViewInit{
  @ViewChild('askQuestion') questionForm:NgForm;
  lastQuestion:string;
  lastQuestionError:string;
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef:any) {

  }

  ngAfterViewInit() {
    this.questionForm.ngSubmit
      .map(_ => {
        var control = this.questionForm.form.controls['question'];
        return {
          control,
          question: control.value
        };
      })
      .flatMap((wrapper) => {
        return PromiseObservable
          .create(<Promise<any>>this._fbRef.child('questions').push({
            question: wrapper.question
          })
          .then(_ => wrapper));
      })
      .subscribe((wrapper:ControlAndValue) => {
        this.lastQuestion = wrapper.question;
        this.lastQuestionError = '';
        wrapper.control.updateValue('');
      }, (err:string) => {
        this.lastQuestionError = err;
      })
  }

}

interface ControlAndValue {
  control: Control;
  question: string;
}