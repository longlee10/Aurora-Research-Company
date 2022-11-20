import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import { Router } from '@angular/router';
import { Question, Survey } from 'src/app/model/survey.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public survey: Survey = new Survey();

  constructor(private surveryService: SurveysService, private router: Router) { }

  ngOnInit(): void {
    this.survey.questions = new Array<Question>();
  }

  onSubmit() {
    this.surveryService.addSurvey(this.survey)
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
  
  onRemoveQuestion(question: Question) {
    this.survey.questions = this.survey.questions?.filter(q => q !== question);
    this.survey.questions?.forEach((q, i) => q.question_priority = i + 1);
  }

}
