import {AfterViewInit, Component, Inject, ViewChild} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {DEFAULT_FIREBASE_REF} from 'angularfire2/angularfire';

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
    this.questionForm.ngSubmit.subscribe((values) => {
      this._fbRef.child('questions').push({
        question: this.questionForm.form.controls['question'].value
      })
    })
  }

}
