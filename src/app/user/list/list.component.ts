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
    this.surveryService.getSurveys(false).subscribe(data => this.surveys = data);
  }

  deleteSurvey(survey: Survey) {
    if(confirm("Are you sure?")) {
      this.surveryService.deleteSurvey(survey._id!)
      .pipe(mergeMap(success => this.surveryService.getSurveys(false)))
      .subscribe(data => this.surveys = data);
    }
  }

}
