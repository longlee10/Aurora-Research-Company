import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
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
  //private baseURL = `https://dennis-test-aurora-research.herokuapp.com`
  private baseURL = environment.backendUri;
  
  constructor(private http: HttpClient) { }


  getSurveys(): Observable<[Survey]> {
    console.log(this.baseURL);
    return this.http.post<[Survey]>(`${this.baseURL}/survey/list`, null, httpOptions);
  }

  getSurvey(id: String): Observable<Survey> {
    console.log("dd" +id);
    return this.http.post<Survey>(`${this.baseURL}/survey/item`, {_id: id}, httpOptions);
  }

  deleteSurvey(id: String): Observable<any> {
    console.log("SERVICE" +id);
    return this.http.post(`${this.baseURL}/survey/delete`, {"_id" :id}, httpOptions);
  }

  addSurvey(survey: any): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/add`, survey, httpOptions);
  }

  editSurvey(survey: any): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/update`, survey, httpOptions);
  }

  // getAllData(): Observable<any> {
  //   return this.http.get(`${this.baseURL}/getAll`)
  // }

  // postData(data: any): Observable<any> {
  //   return this.http.post(`${this.baseURL}/post`, data)
  // }

  // updateData(data: any, id: string): Observable<any> {
  //   return this.http.patch(`${this.baseURL}/update/${id}`, data)
  // }

  // deleteData(id: string): Observable<any> {
  //   return this.http.delete(`${this.baseURL}/delete/${id}`)
  // }
}