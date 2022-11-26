/*******************************
File Name: answer.component.ts
Description: The controlling class of showing answering page.
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
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { Answer, AnswerResponse, Survey } from 'src/app/model/survey.model';
import { SurveysService } from 'src/app/model/surveys.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  public survey: Survey = new Survey();
  public answer: Answer = new Answer();

  constructor(
    private surveryService: SurveysService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {
    this.answer.responses = [];
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap
      .pipe(
        mergeMap((params) =>
          this.surveryService.getSurveyWithoutAnswers(params.get('id')!)
        )
      )
      .subscribe((survey) => {
        this.survey = survey;
        survey.questions?.forEach((q) => {
          var r = new AnswerResponse();
          r.question_id = q._id;
          this.answer.responses?.push(r);
        });
      });
  }

  onSubmitAnswer() {
    this.answer.response_date = new Date();
    this.survey.answers?.push(this.answer);
    this.surveryService
      .addAnswer(this.survey)
      .subscribe((success) => this.router.navigate(['/survey/active']));
  }
}
