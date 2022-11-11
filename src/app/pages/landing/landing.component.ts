import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from 'src/app/model/surveys.service';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/model/survey.model';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public surveys: any;

  constructor(private surveryService: SurveysService) { }

  ngOnInit(): void {
    this.surveryService.getSurveys().subscribe(data => this.surveys = data);
  }


}
