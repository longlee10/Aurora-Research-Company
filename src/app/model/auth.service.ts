import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { SurveysService } from './surveys.service';

@Injectable()
export class AuthService
{
  user: User;

  constructor(private surveysService: SurveysService)
  {
    this.user = new User();
  }

  authenticate(user: User): Observable<any>
  {
    return this.surveysService.authenticate(user);
  }

  storeUserData(token: any, user: User): void
  {
    this.surveysService.storeUserData(token, user);
  }

  get authenticated(): boolean
  {
    return this.surveysService.loggedIn();
  }

  logout(): Observable<any>
  {
    return this.surveysService.logout();
  }

}
