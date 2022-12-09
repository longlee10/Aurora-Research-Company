/*******************************
File Name: auth.guard.ts
Description: Define function to validate a member 
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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Injectable()
export class AuthGuard
{

  constructor(private router: Router,
              private auth: AuthService) { }

  canActivate(): boolean
  {
    if (this.auth.authenticated)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/user/auth']);
      return false;
    }
  }
}
