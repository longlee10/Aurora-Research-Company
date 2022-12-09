/*******************************
File Name: auth.service.ts
Description: Defines the authentication service
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
import { Observable } from 'rxjs';
import { User } from './user.model';
import { SurveysService } from './surveys.service';

@Injectable()
export class AuthService
{

  constructor(private surveysService: SurveysService) {}

  authenticate(user: User): Observable<any>
  {
    return this.surveysService.authenticate(user);
  }

  signup(user:User): Observable<any>
  {
    return this.surveysService.signup(user);
  }

  storeTokenData(token: any): void
  {
    this.surveysService.storeTokenData(token);
  }

  storeUserData(user: User): void
  {
    this.surveysService.storeUserData(user);
  }

  get user(): User | undefined {
    return this.surveysService.loadUser();
  }

  get authenticated(): boolean
  {
    return this.surveysService.loggedIn();
  }

  get isAdmin(): boolean {
    return this.user?.role == 'admin';
  }
  
  logout(): void {
    this.surveysService.logout();
  }

  
}
