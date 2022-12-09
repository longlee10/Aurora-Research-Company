/*******************************
File Name: edit.component.ts
Description: Define the behaviour of the edit survey component
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { Question, Survey } from 'src/app/model/survey.model';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public survey = new Survey();
  public startTime = "";
  public endTime = "";
  public errorMessage? : string;

  constructor(private surveryService: SurveysService, private router: Router, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap
    .pipe(mergeMap(params => this.surveryService.getSurveyWithoutAnswers(params.get('id')!)))
    .subscribe( survey => {
      // Format date
      this.startTime = survey.start_time == undefined ? "" : this.getFormatDate(survey.start_time);
      this.endTime = survey.end_time == undefined ? "" : this.getFormatDate(survey.end_time);
      // Assign survey
      this.survey = survey; 
    });
  }

  private getFormatDate(date: Date) {
    return formatDate(date, "yyyy-MM-dd", "en-US", "+0000");
  }

  onSubmit() {
    // Date conversion
    this.survey.start_time = new Date(this.startTime);
    this.survey.end_time = new Date(this.endTime);
    if (this.survey.start_time > this.survey.end_time) {
      this.errorMessage = "The start time is larger than the end time.";
    } else {
      this.errorMessage = undefined;
      // Submit
      this.surveryService.editSurvey(this.survey)
      .subscribe(success => this.router.navigate(["/user/main/survey/list"]));
    }
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
        list[index] = list[index-1];
        list[index-1] = question;
        this.refresh();
      }
    }
  }

  onMoveToNextQuestion(question: Question) {
    const list = this.survey.questions;
    if (list != undefined) {
      const index = list.indexOf(question);
      if (index > -1 && index < list.length - 1) {
        list[index] = list[index+1];
        list[index+1] = question;
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
