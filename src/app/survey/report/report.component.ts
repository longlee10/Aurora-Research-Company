import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { Answer, Question, Survey } from 'src/app/model/survey.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public survey: any;

  constructor(private surveryService: SurveysService, private router: Router, private _Activatedroute:ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap
    .pipe(mergeMap(params => this.surveryService.getSurvey(params.get('id')!)))
    .subscribe( survey => { 
      this.survey = survey;
  });
  }

  back(): void {
    this.location.back();
  }

  generateQuestionResult(question:any): string {
    var st: string = this.survey.name;
    var yes = 0;
    var no = 0;
    var total = 0;
    var resultStr = "";
    if(question.type == "number"){
      for (let index = 0; index < this.survey.answers.length; index++) {
        const answer = this.survey.answers[index];

        for (let i = 0; i < answer.responses.length; i++) {
          const response = answer.responses[i];
          if(response.question_id == question._id){
            total += 1;
            if(index == this.survey.answers.length-1){
              resultStr += response.options + ". (Total responses: " + total + ")";
            }else{
              resultStr += response.options + ", ";
            }
          }
          
        }
      }

    }else if(question.type == "yesno"){

      for (let index = 0; index < this.survey.answers.length; index++) {
        const answer = this.survey.answers[index];
        for (let i = 0; i < answer.responses.length; i++) {
          
          const response = answer.responses[i];
          if(response.question_id == question._id){
            total += 1;
           
            if(response.options.toString() == "yes"){
              yes += 1;
            }else if(response.options.toString() == "no"){
              no += 1;
            }

          }
        }
      }
      resultStr ="Yes: "+ yes +  ", No: " + no + ", Total: " + total +".";
    }

    if(resultStr == ""){
      resultStr = "No record."
    }
    return resultStr;
  }

}
