import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
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

  public survey = new Survey();

  constructor(private surveryService: SurveysService, private router: Router, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap
    .pipe(mergeMap(params => this.surveryService.getSurveyWithoutAnswers(params.get('id')!)))
    .subscribe( survey => { 
      this.survey = survey; 
  });
  }

  onSubmit() {
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

  onMoveToPreviousQuestion(question: Question) {
    const list = this.survey.questions;
    if (list != undefined) {
      const index = list.indexOf(question);
      if (index > 0) {
        list![index] = list![index-1];
        list![index-1] = question;
        this.refresh();
      }
    }
  }

  onMoveToNextQuestion(question: Question) {
    const list = this.survey.questions;
    if (list != undefined) {
      const index = list.indexOf(question);
      if (index > -1 && index < list.length - 1) {
        list![index] = list![index+1];
        list![index+1] = question;
        this.refresh();
      }
    }
  }

  onRemoveQuestion(question: Question) {
    this.survey.questions = this.survey.questions?.filter(q => q !== question);
    this.refresh();
  }

  private refresh() {
    // Update questions' priorities
    this.survey.questions?.forEach((q, i) => q.question_priority = i + 1);
    // Force rebind because Angular is unable to update changes in text input after moving the questions' order
    this.survey = JSON.parse(JSON.stringify(this.survey));
  }

}
