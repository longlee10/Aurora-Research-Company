import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
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
