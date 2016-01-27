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
  constructor(@Inject(DEFAULT_FIREBASE_REF) private _fbRef:any) {

  }

  ngAfterViewInit() {
    var control = this.questionForm.form.controls['question'];
    this.questionForm.ngSubmit
      .map(() => this.questionForm.form.controls['question'])
      .flatMap((control) => PromiseObservable
        .create(<Promise<any>>this._fbRef.child('questions').push({
          question: this.questionForm.form.controls['question'].value
        }).then(_ => control)))
        .subscribe((control:Control) => {
          control.updateValue('');
        })
  }

}
