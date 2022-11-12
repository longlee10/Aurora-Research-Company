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
import { SurveysService } from 'src/app/model/surveys.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  public surveys: any;

  constructor(private surveryService: SurveysService) {}

  ngOnInit(): void {
    this.surveryService.getSurveys(true).subscribe((data) => (this.surveys = data));
  }
}
