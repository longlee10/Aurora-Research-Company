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
