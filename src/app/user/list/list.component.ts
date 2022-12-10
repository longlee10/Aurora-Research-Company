/*******************************
File Name: list.component.ts
Description: Define the behaviour of the survey list component
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
import { Survey } from 'src/app/model/survey.model';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public surveys: any;

  constructor(private surveryService: SurveysService) { }

  ngOnInit(): void {
    this.surveryService.getUserSurveys().subscribe(data => this.surveys = data);
  }

  deleteSurvey(survey: Survey) {
    if(confirm("Are you sure?")) {
      this.surveryService.deleteSurvey(survey._id!)
      .pipe(mergeMap(success => this.surveryService.getUserSurveys()))
      .subscribe(data => this.surveys = data);
    }
  }

}
