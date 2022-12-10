/*******************************
File Name: active.component.ts
Description: To show the active survey associate with related component
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
import { Survey } from 'src/app/model/survey.model';
import { SurveysService } from 'src/app/model/surveys.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  public activeSurveys: any;
  public inactiveSurveys: any;

  constructor(private surveryService: SurveysService) {}

  ngOnInit(): void {
    // Obtain date
    const date = new Date();

    // Check inside date range
    const insideDateRange = (survey: Survey) => {
      const startTime = new Date(survey.start_time!);
      startTime.setUTCHours(0, 0, 0, 0);
      const endTime = new Date(survey.end_time!);
      endTime.setUTCHours(23, 59, 59, 999);
      return startTime <= date && date <= endTime;
    };
    
    // Obtain surveys
    this.surveryService.getSurveys().subscribe(data => {
      this.activeSurveys = data.filter(survey => insideDateRange(survey));
      this.inactiveSurveys = data.filter(survey => !insideDateRange(survey));
    });
  }
}
