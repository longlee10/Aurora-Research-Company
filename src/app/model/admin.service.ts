import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    get authenticated(): boolean {
        return true;
    }

    private baseURL = environment.backendUri + '/admin';

    headers = new HttpHeaders().set("Content-Type", "application/json");

    constructor(private http: HttpClient, public router: Router) { }

    getUsers(): Observable<any> {

        let api = this.baseURL + '/user-list';
        //let authToken = localStorage.getItem("access_token");
        //this.headers = this.headers.append("Authorization", 'Bearer ' + authToken || '');
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    getUser(id: number): Observable<any> {
        let api = this.baseURL + '/user-profile/' + id;
        //let authToken = localStorage.getItem("access_token");
        //this.headers = this.headers.append("Authorization", 'Bearer ' + authToken || '');;
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    deleteUser(id: any): Observable<any> {
        let API_URL = this.baseURL + '/delete-user/' + id;
        return this.http
            .delete(API_URL, { headers: this.headers });
    }

    updateUser(id: any, data: any): Observable<any> {
        let API_URL = this.baseURL + '/edit-user/' + id;
        return this.http.post(API_URL, { headers: this.headers, data });
    }

    getSurveys(): Observable<any> {

        let api = this.baseURL + '/survey-list';
        //let authToken = localStorage.getItem("access_token");
        //this.headers = this.headers.append("Authorization", 'Bearer ' + authToken || '');
        return this.http.get(api, { headers: this.headers }).pipe(
            map((res) => {
                return res || {};
            })
        );
    }

    updateSurveyStatus(id: any, data: any): Observable<any> {
        let API_URL = this.baseURL + '/update-survey-status/' + id;
        return this.http.post(API_URL, { headers: this.headers, data });
    }


}