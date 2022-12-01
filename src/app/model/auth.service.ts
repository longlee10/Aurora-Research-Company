import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { SurveysService } from './surveys.service';

@Injectable()
export class AuthService {

  constructor(private surveysService: SurveysService) { }

  authenticate(user: User): Observable<any> {
    return this.surveysService.authenticate(user);
  }

  signup(user: User): Observable<any> {
    return this.surveysService.signup(user);
  }

  storeUserData(token: any, user: User): void {
    this.surveysService.storeUserData(token, user);
  }

  get user(): User | undefined {
    return this.surveysService.loadUser();
  }

  get authenticated(): boolean {
    return this.surveysService.loggedIn();
  }

  get isAdmin(): boolean {
    return this.user?.role == 'admin';
  }
  
  logout(): void {
    this.surveysService.logout();
  }

}
