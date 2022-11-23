import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer, Survey } from './survey.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  private baseURL = environment.backendUri;
  
  constructor(private http: HttpClient) { }

  getSurveys(onlyActive: boolean): Observable<[Survey]> {
    return this.http.post<[Survey]>(`${this.baseURL}/survey/list`, {onlyActive: onlyActive}, httpOptions);
  }

  getSurvey(id: String): Observable<Survey> {
    return this.http.post<Survey>(`${this.baseURL}/survey/item`, {_id: id}, httpOptions);
  }

  getSurveyWithoutAnswers(id: String): Observable<Survey> {
    return this.http.post<Survey>(`${this.baseURL}/survey/item-without-answers`, {_id: id}, httpOptions);
  }

  deleteSurvey(id: String): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/delete`, {"_id" :id}, httpOptions);
  }

  addSurvey(survey: any): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/add`, survey, httpOptions);
  }

  editSurvey(survey: any): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/update`, survey, httpOptions);
  }

  addAnswer(answer: Survey): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/answer`, answer, httpOptions);
  }

}