import {AfterViewInit, Component, Inject, ViewChild} from 'angular2/core';
import {NgForm, Control} from 'angular2/common';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';
import {PromiseObservable} from 'rxjs/observable/fromPromise';
import {Auth} from '../../services/auth-state/auth-state';




@Component({
  selector: 'question',
  template: `
    Ask a Question
    <form #askQuestion="ngForm">
      <input ngControl="question">
      <button>Ask</button>
      <p *ngIf="lastQuestionError">
        Something Went Wrong: {{lastQuestionError}}
      </p>
      <p *ngIf="lastQuestion">
        Question Posted: {{lastQuestion}}
      </p>
    </form>
  `
})
export class Question implements AfterViewInit{
  @ViewChild('askQuestion') questionForm:NgForm;
  lastQuestion:string;
  lastQuestionError:string;


  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef:any, private _auth:Auth) {

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
        console.log(this._auth.auth.github.username);
        return PromiseObservable
          .create(<Promise<any>>this._fbRef.child('questions').push({
            question: wrapper.question,
            author: this._auth.auth.uid
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
