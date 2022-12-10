/*******************************
File Name: surveys.service.ts
Description: Defines the surveys remote service
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './survey.model';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class SurveysService {

  private authToken?: string;
  private baseURL = environment.backendUri;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService, private auth: AuthService) {
    this.loadUser();
    this.loadToken();
   }

   getUserSurveys(): Observable<[Survey]> {
    this.loadToken();
    return this.http.post<[Survey]>(`${this.baseURL}/survey/my-list`, {}, this.httpOptions);
  }

  getSurveys(): Observable<[Survey]> {
    return this.http.post<[Survey]>(`${this.baseURL}/survey/list`, {}, this.httpOptions);
  }

  getSurvey(id: String): Observable<Survey> {
    this.loadToken();
    return this.http.post<Survey>(`${this.baseURL}/survey/item`, {_id: id}, this.httpOptions);
  }

  getSurveyWithoutAnswers(id: String): Observable<Survey> {
    return this.http.post<Survey>(`${this.baseURL}/survey/item-without-answers`, {_id: id}, this.httpOptions);
  }

  deleteSurvey(id: String): Observable<any> {
    this.loadToken();
    return this.http.post(`${this.baseURL}/survey/delete`, {"_id" :id}, this.httpOptions);
  }

  addSurvey(survey: any): Observable<any> {
    this.loadToken();
    return this.http.post(`${this.baseURL}/survey/add`, survey, this.httpOptions);
  }

  editSurvey(survey: any): Observable<any> {
    this.loadToken();
    return this.http.post(`${this.baseURL}/survey/update`, survey, this.httpOptions);
  }

  addAnswer(answer: Survey): Observable<any> {
    return this.http.post(`${this.baseURL}/survey/answer`, answer, this.httpOptions);
  }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(`${this.baseURL}/user/login`, user, this.httpOptions);
  }

  signup(user: User): Observable<any>
  {
    return this.http.post<any>(`${this.baseURL}/user/register`, user, this.httpOptions);
  }
  
  storeTokenData(token: any): void {
    localStorage.setItem('id_token', 'Bearer ' + token);
    this.authToken = token;
  }

  storeUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void
  {
    this.authToken = undefined;
    localStorage.clear();
  }

  loggedIn(): boolean
  {
    if (this.authToken == null) {
      return false;
    } else {
      return !this.jwtService.isTokenExpired(this.authToken);
    }
  }

  loadUser(): User | undefined 
  {
    try {
      const user = localStorage.getItem('user') ?? "";
      return JSON.parse(user);
    } catch (e) {
      return undefined;
    }
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    if (token != null) {
      this.authToken = token;
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token);
    }
  }

  updateUser(user: User): Observable<any>
  {
    this.loadToken();
    return this.http.post(`${this.baseURL}/user/edit`, user, this.httpOptions);
  }

  updatePassword(user: User): Observable<any>
  {
    this.loadToken();
    return this.http.post(`${this.baseURL}/user/edit-password`, user, this.httpOptions);
  }

}