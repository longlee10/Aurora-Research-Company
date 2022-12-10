/*******************************
File Name: report.component.ts
Description: Define the behaviour of the survey report component
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
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { saveAs } from "file-saver";
import { parse } from "json2csv";
import { Answer, Question, Survey } from 'src/app/model/survey.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public survey: any;
  public chartDataMap = new Map<string, any>();

  constructor(private surveryService: SurveysService, private router: Router, private _Activatedroute:ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap
    .pipe(mergeMap(params => this.surveryService.getSurvey(params.get('id')!)))
    .subscribe( survey => { 
      this.survey = survey;
      this.loadChartDataToMap(survey);
    });
  }

  private loadChartDataToMap(survey: Survey): void {
    const questions = survey?.questions ?? [];
    // Load charts by type
    for(const question of questions) {
      if (question.type == "yesno") {
        const data = this.getYesNoChartData(question, survey.answers ?? []);
        this.chartDataMap.set(question._id!, data);
      } else if (question.type == "number") {
        const data = this.getNumberChartData(question, survey.answers ?? []);
        this.chartDataMap.set(question._id!, data);
      } else {
        console.log(`Unknown question type: ${question.type}`);
      }
    }
  }

  private getYesNoChartData(question: Question, answers: Answer[]): any {
    // Find yes and no count
    const options = this.getOptions(question._id!, answers);
    const yesCount = options.filter(option => option == 'yes').length;
    const noCount = options.filter(option => option == 'no').length;
    // Make chart data
    return this.createPieChartData(['Yes', 'No'], [yesCount, noCount]);
  }

  private getOptions(questionId: string, answers: Answer[]): string[] {
    return answers
    .flatMap(answer => answer.responses)
    ?.filter(response => response?.question_id == questionId)
    ?.flatMap(response => response?.options)
    ?.map(option => option ?? "");
  }

  private createPieChartData(categoryData: string[], valueData: number[]): any {
    const totalRespondents = valueData.reduce((acc, current) => acc + current, 0);
    return {
      title: {
        text: `Number of respondents: ${totalRespondents}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          data: categoryData.map((c, i) => {
            return { 'name': c, 'value': valueData[i] }
          }),
          type: 'pie',
          label: {
            formatter: '{b}: {@9999} ({d}%)'
          },
        },
      ],
      color: ['#5C7BD9', '#FF8888', '#00FF00'],
    };
  }

  private createBarChartData(categoryData: string[], valueData: number[]): any {
    const totalRespondents = valueData.reduce((acc, current) => acc + current, 0);
    return {
      title: {
        text: `Number of respondents: ${totalRespondents}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: categoryData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: valueData,
          type: 'bar',
        },
      ],
    };
  }
  
  private getNumberChartData(question: Question, answers: Answer[]): any {
    const options = this.getOptions(question._id!, answers)
                    .map(option => Number(option))
                    .filter(option => !Number.isNaN(option));
    const [min, max] = [Math.min(...options) , Math.max(...options)];
    const binSize = (max - min) / 5;
    if (binSize == 0) {
      // Only 1 item
      return this.createBarChartData([min.toString()], [options.length]);
    } else {
      // Bin descriptions
      const binDescriptions = [...Array(5).keys()]
        .map(index => {
          const from = min + index * binSize;
          const to = min + (index + 1) * binSize;
          return `${from.toFixed(1)}-${to.toFixed(1)}`;
        });
      // Classified to bins
      const bins = options.reduce((acc, option) => {   
        let index = Math.ceil((option - min)/ binSize);
        // Bound values to handle round up case
        index = index < 5 ? index : 4;
        index = index < 0 ? 0 :index;
        acc[index] += 1;
        return acc;
      }, [0, 0, 0, 0, 0]);
      return this.createBarChartData(binDescriptions, bins);
    }
  }

  back(): void {
    this.location.back();
  }

  downloadDataset() {
    // Make a dataset
    const dataset = this.createCSV(this.survey);
    // Save as CSV file
    const data: Blob = new Blob([dataset], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(data, "dataset.csv");
  }
  
  private createCSV(survey: Survey) {
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
       const resultMap = questions.reduce((acc, question) => {      
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
