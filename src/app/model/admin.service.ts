/*******************************
File Name: admin.service.ts
Description: Defines the admin remote service
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private baseURL = environment.backendUri + '/admin';
    private authToken?: string;
    private httpOptions =
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            })
        };

    constructor(private http: HttpClient, public router: Router) { }

    getUsers(): Observable<any> {
        let api_url = this.baseURL + '/user-list';
        this.loadToken();

        return this.http.get(api_url, this.httpOptions).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    getUser(id: number): Observable<any> {
        let api_url = this.baseURL + '/user-profile/' + id;
        this.loadToken();

        return this.http.get(api_url, this.httpOptions).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    deleteUser(id: any): Observable<any> {
        let api_url = this.baseURL + '/delete-user/' + id;
        this.loadToken();

        return this.http.delete(api_url, this.httpOptions);
    }

    updateUser(id: any, data: any): Observable<any> {
        let api_url = this.baseURL + '/edit-user/' + id;
        this.loadToken();

        return this.http.post(api_url, { data: data }, this.httpOptions);
    }

    getSurveys(): Observable<any> {

        let api_url = this.baseURL + '/survey-list';
        this.loadToken();

        return this.http.get(api_url, this.httpOptions).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    private loadToken(): void {
        const token = localStorage.getItem('id_token');
        if (token != null) {
            this.authToken = token;
            this.httpOptions.headers = this.httpOptions.headers.set('Authorization', token);
        }
    }

    updateUserStatus(id: any, data: any): Observable<any> {
        let api_url = this.baseURL + '/update-user-status/' + id;
        this.loadToken();

        return this.http.post(api_url, { data: data }, this.httpOptions);
    }

    updateSurveyStatus(id: any, data: any): Observable<any> {
        let api_url = this.baseURL + '/update-survey-status/' + id;
        this.loadToken();

        return this.http.post(api_url, { data: data }, this.httpOptions);
    }

    updateSurveysStatus(author: any, data: any): Observable<any> {
        let api_url = this.baseURL + '/update-surveys-status/' + author;
        this.loadToken();
        return this.http.post(api_url, { data: data }, this.httpOptions);
    }
}