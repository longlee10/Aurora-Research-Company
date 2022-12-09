/*******************************
File Name: survey-list.component.ts
Description: Define the behaviour of survey list component
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
import { AdminService } from 'src/app/model/admin.service';
import { Survey } from 'src/app/model/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  public Surveys: Survey[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getSurveys().subscribe((data) => {
      if (!data.status) {
        this.Surveys = data
      }
    });
  }

  changeSurveyStatus(id?: string, newIsActive?: boolean) {
    if (id) {
      this.adminService.updateSurveyStatus(id, newIsActive).subscribe((res) => {
        let survey = this.Surveys.find(x => x._id == id);
        if (survey) {
          survey.isActive = newIsActive;
        }
      });
    }
  }
}
