import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/model/survey.model';
import { mergeMap, retry } from 'rxjs/operators';
import { saveAs } from "file-saver";
import { Parser } from "json2csv";

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
    this.surveryService.deleteSurvey(survey._id!)
    .pipe(mergeMap(success => this.surveryService.getSurveys(false)))
    .subscribe(data => this.surveys = data);
  }

  downloadDataset(survey: Survey) {
    this.surveryService.getSurvey(survey._id!)
    .subscribe(result => {
      // Make a 
      const dataset = this.createDataset(result);
      // Save as CSV file
      const data: Blob = new Blob([dataset], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(data, "dataset.csv");
    })
  }
  
  private createDataset(survey: Survey) {
    return "";
  }
}
