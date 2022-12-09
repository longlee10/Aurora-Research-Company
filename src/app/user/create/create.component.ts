/*******************************
File Name: create.component.ts
Description: Define the behaviour of the create survey component
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
import { Router } from '@angular/router';
import { Question, Survey } from 'src/app/model/survey.model';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public survey = new Survey();
  public errorMessage? : string;

  constructor(private authService: AuthService, private surveyService: SurveysService, private router: Router) { }

  ngOnInit(): void {
    this.survey.author = this.authService.user?.username;
    this.survey.questions = new Array<Question>();
  }

  onSubmit() {
    if (this.survey.start_time == undefined) {
      this.errorMessage = "Please enter a start time.";
    } else if (this.survey.end_time == undefined) {
      this.errorMessage = "Please enter a end time.";
    } else if (this.survey.start_time > this.survey.end_time) {
      this.errorMessage = "The start time is larger than the end time.";
    } else {
      this.errorMessage = undefined;
      this.surveyService.addSurvey(this.survey)
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
