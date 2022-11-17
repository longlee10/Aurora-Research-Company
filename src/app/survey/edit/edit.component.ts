import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import {NgForm} from '@angular/forms';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { Question, Survey } from 'src/app/model/survey.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public survey: any;

  constructor(private surveryService: SurveysService, private router: Router, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap
    .pipe(mergeMap(params => this.surveryService.getSurveyWithoutAnswers(params.get('id')!)))
    .subscribe( survey => { 
      this.survey = survey; 
  });
  }

  onSubmit(form: NgForm) {
    this.surveryService.editSurvey(this.survey)
    .subscribe(success => this.router.navigate(["/survey/list"]));
  }

  onNewYesNoQuestion() {
    var question = new Question();
    question.name = "";
    question.question_priority = 1 + this.survey.questions!.length;
    question.options = ["yes", "no"];
    question.type = "yesno";
    this.survey.questions?.push(question);
  }

  onNewNumberQuestion() {
    var question = new Question();
    question.name = "";
    question.question_priority = 1 + this.survey.questions!.length;
    question.options = [];
    question.type = "number";
    this.survey.questions?.push(question);
  }

}
