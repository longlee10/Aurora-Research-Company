import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/model/admin.service';
import { Survey } from 'src/app/model/survey.model';
import { SurveysService } from 'src/app/model/surveys.service';

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
