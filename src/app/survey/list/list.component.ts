import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/model/surveys.service';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/model/survey.model';
import { mergeMap, retry } from 'rxjs/operators';
import { saveAs } from "file-saver";
import { parse } from "json2csv";

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
      // Make a dataset
      const dataset = this.createDataset(result);
      // Save as CSV file
      const data: Blob = new Blob([dataset], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(data, "dataset.csv");
    })
  }
  
  private createDataset(survey: Survey) {
    try {
      const questions = survey?.questions ?? [];
      // Column headers
      const questionFields = questions.map(question => {
        return {label: question.name ?? "", value: question._id! };
      });
      const fields = [{label: "Date", value: "date"}].concat(questionFields);

      // Values for each answer
      const data = survey?.answers?.map(answer => {
       // Get date string
       const responseDate = answer?.response_date != undefined ? new Date(answer.response_date).toLocaleDateString() : "";
       // Add responses
       let resultMap = questions.reduce((acc, question) => {      
          const questionId = question._id!;  
          const response = answer.responses?.filter(response => (response.question_id ?? "") == questionId).shift();
          acc.set(questionId, response?.options?.join() ?? "");
          return acc;
        }, new Map([["date", responseDate]]));
        return Object.fromEntries(resultMap);
      }) ?? [];

      // Get CSV
      return parse(data, { fields });
    } catch (err) {
      return `Error: ${err}`;
    }
  }
}
